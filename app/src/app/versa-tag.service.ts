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

  getIssuesText(url, expectedVersaTagId) {
    let {
      testResults: { versaTags, finalURL }
    } = url;

    let text = "";
    let redirect = this.isRedirect(url);

    let noVT = versaTags && !versaTags.length;
    let noMappingRule = !this.isMappingRuleActivated(url);
    let error404 = this.is404(url);
    let multipleTags = this.isMultipleTags(url) && versaTags;
    let redirected = redirect.fullResult; //OVERRIDE?
    let wrongVT = !this.isVersaTagIdMatch(url, expectedVersaTagId) && versaTags;

    if (noVT) {
      text += `No VersaTag fired.`;
    }

    if (!noVT && !wrongVT && noMappingRule) {
      text += `Mapping Rule does not activate. `;
    }

    if (error404) {
      text += `404 Error on this URL. `;
    }

    if (!noVT && multipleTags) {
      text += `Multiple VersaTags fired on this page. The following VersaTag${
        versaTags.length > 0 ? "s" : ""
      } fired: ${versaTags.map(response => response.versaTagId).join(", ")}. `;
    }

    if (redirected) {
      text += `URL redirects to: ${finalURL}`;
    }

    if (!noVT && !multipleTags && wrongVT) {
      text += `Wrong VersaTag fired. The following VersaTag${
        versaTags.length > 0 ? "s" : ""
      } fired: ${versaTags.map(response => response.versaTagId).join(", ")}. `;
    }

    return text || "None";
  }

  isPass(url, expectedVersaTagId) {
    return (
      this.isMappingRuleActivated(url) &&
      !this.is404(url) &&
      !this.isMultipleTags(url) &&
      !this.isRedirect(url).fullResult &&
      this.isVersaTagIdMatch(url, expectedVersaTagId)
    );
  }

  isVersaTagIdMatch(url, expectedVersaTagId) {
    let {
      testResults: { versaTags }
    } = url;

    if (!versaTags) {
      return false;
    }

    let matches = false;
    versaTags.forEach(item => {
      if (item.versaTagId == expectedVersaTagId) {
        matches = true;
      }
    });

    return matches;
  }

  isMultipleTags(url) {
    if (!url || !url.testResults || !url.testResults.versaTags) {
      return false;
    }

    return url.testResults.versaTags.length > 1;
  }

  is404(url) {
    if (!url || !url.testResults || !url.testResults.pageStatus) {
      return false;
    }

    return url.testResults.pageStatus === 404;
  }

  isRedirect(url) {
    if (!url || !url.url || !url.testResults || !url.testResults.finalURL) {
      return { fullResult: false, domain: false, path: false, etc: false };
    }

    let orignal = url.url.trim().replace("*", "");
    let final = url.testResults.finalURL.trim().replace("*", "");

    let urlRegex = /^(?:http(?:s)?:\/\/)?([a-zA-Z0-9-_\.]+)((?:\/[-a-zA-Z0-9%_\+.~=]+)+)?\/?(.*)?$/i;

    let [, originalDomain, originalPath, originalETC] = urlRegex.exec(orignal);
    let [, finalDomain, finalPath, finalETC] = urlRegex.exec(final);

    return {
      fullResult:
        originalDomain !== finalDomain ||
        originalPath !== finalPath ||
        originalETC !== finalETC,
      domain: {
        original: originalDomain,
        final: finalDomain,
        result: originalDomain !== finalDomain
      },
      path: {
        original: originalPath,
        final: finalPath,
        result: originalPath !== finalPath
      },
      etc: {
        original: originalETC,
        final: finalETC,
        result: originalETC !== finalETC
      }
    };
  }

  isMappingRuleActivated(url) {
    let {
      testResults: { versaTags }
    } = url;

    let ruleMatch = false;
    versaTags &&
      versaTags.forEach(response => {
        if (response.mappingRules.indexOf(url.mappingRule) > -1) {
          ruleMatch = true;
        }
      });

    return ruleMatch;
  }
}
