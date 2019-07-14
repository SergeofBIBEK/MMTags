import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatBadgeModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { VersaTagService } from "./versa-tag.service";
import { TitleBarComponent } from "./title-bar/title-bar.component";
import { UserInputComponent } from "./user-input/user-input.component";
import { DetailsTabComponent } from "./details-tab/details-tab.component";
import { ReportTabComponent } from "./report-tab/report-tab.component";

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    UserInputComponent,
    DetailsTabComponent,
    ReportTabComponent
  ],
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
    MatTableModule,
    MatProgressBarModule,
    MatBadgeModule
  ],
  providers: [VersaTagService],
  bootstrap: [AppComponent]
})
export class AppModule {}

//TODO: Redirect Override
