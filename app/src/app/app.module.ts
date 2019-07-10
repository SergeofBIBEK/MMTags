import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { VersaTagService } from './versa-tag.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, MatInputModule, MatFormFieldModule],
  providers: [VersaTagService],
  bootstrap: [AppComponent]
})
export class AppModule {}
