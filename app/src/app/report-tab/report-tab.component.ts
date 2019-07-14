import { Component, Input } from "@angular/core";

@Component({
  selector: "app-report-tab",
  templateUrl: "./report-tab.component.html",
  styleUrls: ["./report-tab.component.scss"]
})
export class ReportTabComponent {
  @Input() testList;
  @Input() getPassText;
  @Input() getIssuesText;
}
