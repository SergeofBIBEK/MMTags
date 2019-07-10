import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .post("/api/test", {
        url: "http://www.landrovercharlotte.com/financing/center.htm"
      })
      .subscribe(res => {
        console.log(res);
      });
  }
}
