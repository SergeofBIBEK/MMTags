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
  public testList = [];
  private testQueue = [];
  private inProgress = 0;
  private maxInProgress = 5;

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

    for (var i = 0; i < this.maxInProgress; i++) {
      this.testNextUrl();
    }
  }

  async testNextUrl() {
    if (this.inProgress < this.maxInProgress && this.testQueue.length) {
      this.inProgress++;
      let nextUrl = this.testQueue.pop();
      nextUrl.status = 1;
      nextUrl.testResults = await this.versaTagService.testVersaTag(
        nextUrl.url
      );
      console.log("nextUrl: ", nextUrl);
      nextUrl.status = 2;
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
      return "Processing";
    }

    return this.versaTagService.isPass(url, this.versaTagId.value) ? "Pass" : "Fail";
  }
}
