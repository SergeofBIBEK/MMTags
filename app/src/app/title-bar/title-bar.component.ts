import { Component, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-title-bar",
  templateUrl: "./title-bar.component.html",
  styleUrls: ["./title-bar.component.scss"]
})
export class TitleBarComponent {
  @Input() testingInProgress = false;
  @Output() startTesting = new EventEmitter();
  @Output() stopTesting = new EventEmitter();
}
