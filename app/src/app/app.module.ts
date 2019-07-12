import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatTabsModule, MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { VersaTagService } from "./versa-tag.service";

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
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [VersaTagService],
  bootstrap: [AppComponent]
})
export class AppModule {}

//TODO: Retry, Redirect Override, Progress bar, number of concurrent requests
