import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { VersaTagService } from "./versa-tag.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  providers: [VersaTagService],
  bootstrap: [AppComponent]
})
export class AppModule {}
