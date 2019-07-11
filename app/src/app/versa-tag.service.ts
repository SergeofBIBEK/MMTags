import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class VersaTagService {
  private testsInProgress = 0;
  private maxTests = 5;

  constructor(private http: HttpClient) {}

  testVersaTag(url) {
    return this.http.post("/api/testVersaTag", { url }).toPromise();
  }

  parseUrlInput(urlInput) {
    return urlInput
      .split("\n")
      .filter(line => line)
      .map((line, index, array) => {
        if (line.indexOf("\t") > -1) {
          let [url, mappingRule] = line.split("\t");
          return { url, mappingRule };
        }

        if (index % 2 === 0) {
          return { url: line, mappingRule: array[index + 1] };
        }
      })
      .filter(line => line);
  }
}
