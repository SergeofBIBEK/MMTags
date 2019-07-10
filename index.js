const puppeteer = require("puppeteer");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
  );

  page.on("request", interceptedRequest => {
    if (
      interceptedRequest.url().indexOf("bs.serving-sys.com/Serving?cn=ot") > -1
    ) {
      console.log("FOUND ONE");
      interceptedRequest.continue({
        url: interceptedRequest.url() + "&mmdebug=1"
      });
    } else {
      interceptedRequest.continue();
    }
  });

  page.on("response", async response => {
    if (response.url().indexOf("bs.serving-sys.com/Serving?cn=ot") > -1) {
      console.log("RESPONSE: ", response.url());
      console.log("RESPONS BODY: ", await response.text());
    }
  });

  await page.goto("http://www.landrovercharlotte.com/financing/center.htm", {
    waitUntil: "networkidle2"
  });

  await browser.close();
}

start();
