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
  private maxInProgress = new FormControl(5);
  public testList = [];
  private testQueue = [];
  private inProgress = 0;

  constructor(private versaTagService: VersaTagService) {}

  async ngOnInit() {
    this.urlInput.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      this.testList = this.versaTagService.parseUrlInput(value).map(vt => {
        return { ...vt, status: 0, testResults: {} };
      });
    });
  }

  stopTesting() {
    //asdf
  }

  startTesting() {
    this.stopTesting();
    this.urlInput.disable({ emitEvent: false });
    this.testQueue = this.testList.slice();

    for (var i = 0; i < this.maxInProgress.value; i++) {
      this.testNextUrl();
    }
  }

  retry(url) {
    this.testQueue.push(url);

    if (this.inProgress < this.maxInProgress.value) {
      this.testNextUrl();
    }
  }

  async testNextUrl() {
    if (this.inProgress < this.maxInProgress.value && this.testQueue.length) {
      this.inProgress++;
      let nextUrl = this.testQueue.pop();
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
      this.inProgress--;
      this.testNextUrl();
    }
  }

  getIssuesText(url) {
    if (url.status !== 2) {
      return "...";
    }
    return this.versaTagService.getIssuesText(url, this.versaTagId.value);
  }

  getPassText(url) {
    if (url.status !== 2) {
      return "...";
    }

    return this.versaTagService.isPass(url, this.versaTagId.value)
      ? "Pass"
      : "Fail";
  }

  get totalTested() {
    return this.testList.filter(url => url.status >= 2).length;
  }
}
