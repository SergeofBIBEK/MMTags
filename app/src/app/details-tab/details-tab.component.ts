import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-details-tab",
  templateUrl: "./details-tab.component.html",
  styleUrls: ["./details-tab.component.scss"]
})
export class DetailsTabComponent {
  @Input() testList;
  @Input() getPassText;
  @Input() getIssuesText;
  @Output() retry = new EventEmitter();
}
