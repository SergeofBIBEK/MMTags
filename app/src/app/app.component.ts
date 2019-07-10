import { Component, OnInit } from "@angular/core";
import { VersaTagService } from './versa-tag.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(private versaTagService: VersaTagService) {}

  async ngOnInit() {
    //let results = await this.versaTagService.testVersaTag("http://www.landrovercharlotte.com/financing/center.htm");
    //console.log('results: ', results);
  }
}
