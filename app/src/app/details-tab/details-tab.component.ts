import { Component, Input, Output, EventEmitter } from "@angular/core";
import { VersaTagService } from "../versa-tag.service";

@Component({
  selector: "app-details-tab",
  templateUrl: "./details-tab.component.html",
  styleUrls: ["./details-tab.component.scss"]
})
export class DetailsTabComponent {
  @Input() testList;
  @Input() getPassText;
  @Input() getIssuesText;
  @Input() versaTagId;
  @Output() retry = new EventEmitter();

  public statusText = ["In Queue", "Processing", "Complete", "Error"];

  constructor(public service: VersaTagService) {}
}
