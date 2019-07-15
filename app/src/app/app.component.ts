import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { VersaTagService } from "./versa-tag.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public urlInput = new FormControl({ value: "", disabled: false });
  public versaTagId = new FormControl();
  public maxInProgress = new FormControl(5);
  public testList = [];
  private testQueue = [];

  constructor(private versaTagService: VersaTagService) {}

  async ngOnInit() {
    this.urlInput.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      this.testList = this.versaTagService.parseUrlInput(value).map(vt => {
        return { ...vt, status: 0, testResults: {} };
      });
    });

    this.maxInProgress.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value => {
        for (var i = this.inProgress; i < value; i++) {
          this.testNextUrl();
        }
      });
  }

  stopTesting() {
    this.testQueue = [];
  }

  startTesting() {
    this.stopTesting();
    this.urlInput.disable({ emitEvent: false });
    this.testQueue = this.testList.slice();
    this.testQueue.forEach(url => {
      url.status = 0;
    });

    for (var i = this.inProgress; i < this.maxInProgress.value; i++) {
      this.testNextUrl();
    }
  }

  retry(url) {
    this.testQueue.push(url);
    url.status = 0;

    if (this.inProgress < this.maxInProgress.value) {
      this.testNextUrl();
    }
  }

  retryAllFails() {
    this.testQueue = [
      ...this.testQueue,
      ...this.testList.filter(url => {
        let retry = !this.versaTagService.isPass(url, this.versaTagId.value);
        if (retry) {
          url.status = 0;
        }
        return retry;
      })
    ];

    for (var i = this.inProgress; i < this.maxInProgress.value; i++) {
      this.testNextUrl();
    }
  }

  async testNextUrl() {
    if (this.inProgress < this.maxInProgress.value && this.testQueue.length) {
      let nextUrl = this.testQueue.shift();
      nextUrl.status = 1;
      try {
        nextUrl.testResults = await this.versaTagService.testVersaTag(
          nextUrl.url
        );
        nextUrl.status = 2;
      } catch (error) {
        nextUrl.status = 3;
      }
      console.log("nextUrl: ", nextUrl);
      this.testNextUrl();
    }
  }

  getIssuesText(url) {
    if (url.status !== 2) {
      return "...";
    }
    return this.versaTagService.getIssuesText(url, this.versaTagId.value);
  }

  getIssuesTextBound = this.getIssuesText.bind(this);
  getPassTextBound = this.getPassText.bind(this);

  getPassText(url) {
    if (url.status !== 2) {
      return "...";
    }

    return this.versaTagService.isPass(url, this.versaTagId.value)
      ? "Pass"
      : "Fail";
  }

  get inProgress() {
    return this.testList.filter(url => url.status === 1).length;
  }

  get totalTested() {
    return this.testList.filter(url => url.status >= 2).length;
  }
}
