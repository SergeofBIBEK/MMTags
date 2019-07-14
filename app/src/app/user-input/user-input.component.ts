import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-user-input",
  templateUrl: "./user-input.component.html",
  styleUrls: ["./user-input.component.scss"]
})
export class UserInputComponent implements OnInit {
  @Input() urlInput
  @Input() versaTagId

  ngOnInit() {
  }

  toggleLocked() {
    if (this.urlInput.disabled) {
      this.urlInput.enable({ emitEvent: false });
    } else {
      this.urlInput.disable({ emitEvent: false });
    }
  }
}
