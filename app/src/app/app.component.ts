import { Component, OnInit } from "@angular/core";
import { VersaTagService } from "./versa-tag.service";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public urlInput = new FormControl({ value: "", disabled: false });
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

  toggleLocked() {
    if (this.urlInput.disabled) {
      this.urlInput.enable({ emitEvent: false });
    } else {
      this.urlInput.disable({ emitEvent: false });
    }
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
      nextUrl.status = 2;
      this.inProgress--;
      this.testNextUrl();
    }
  }
}
