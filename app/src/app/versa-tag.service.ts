import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VersaTagService {

  constructor(private http: HttpClient) { }

  testVersaTag(url) {
    return this.http.post("/api/testVersaTag", { url }).toPromise();
  }
}
