import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-user-input",
  templateUrl: "./user-input.component.html",
  styleUrls: ["./user-input.component.scss"]
})
export class UserInputComponent {
  @Input() urlInput;
  @Input() versaTagId;
  @Input() maxInProgress;
  @Output() retryFails = new EventEmitter();

  toggleLocked() {
    if (this.urlInput.disabled) {
      this.urlInput.enable({ emitEvent: false });
    } else {
      this.urlInput.disable({ emitEvent: false });
    }
  }
}
