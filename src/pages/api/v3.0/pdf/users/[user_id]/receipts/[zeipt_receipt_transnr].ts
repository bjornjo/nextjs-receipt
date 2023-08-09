import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Browser } from "puppeteer";

let browserInstance: Browser | null = null;

async function getBrowserInstance() {
  if (!browserInstance) {
    if (process.env.NODE_ENV === "development") {
      browserInstance = await puppeteer.launch();
    } else {
      browserInstance = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN || "/usr/bin/chromium-browser",
        userDataDir: "./tmp",
        headless: true,
        args: [
          "--disable-features=IsolateOrigins",
          "--disable-site-isolation-trials",
          "--autoplay-policy=user-gesture-required",
          "--disable-background-networking",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
          "--disable-breakpad",
          "--disable-client-side-phishing-detection",
          "--disable-component-update",
          "--disable-default-apps",
          "--disable-dev-shm-usage",
          "--disable-domain-reliability",
          "--disable-extensions",
          "--disable-features=AudioServiceOutOfProcess",
          "--disable-hang-monitor",
          "--disable-ipc-flooding-protection",
          "--disable-notifications",
          "--disable-offer-store-unmasked-wallet-cards",
          "--disable-popup-blocking",
          "--disable-print-preview",
          "--disable-prompt-on-repost",
          "--disable-renderer-backgrounding",
          "--disable-setuid-sandbox",
          "--disable-speech-api",
          "--disable-sync",
          "--hide-scrollbars",
          "--ignore-gpu-blacklist",
          "--metrics-recording-only",
          "--mute-audio",
          "--no-default-browser-check",
          "--no-first-run",
          "--no-pings",
          "--no-sandbox",
          "--no-zygote",
          "--password-store=basic",
          "--use-gl=swiftshader",
          "--use-mock-keychain",
        ],
      });
    }
  }
  return browserInstance;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Check if the request includes the 'Authorization' header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { public_view, user_id, zeipt_receipt_transnr } = req.query;

    /* CORS */
    const allowedOrigins = [
      "https://zeipt.com",
      "https://www.zeipt.com",
      "https://receipt.zeipt.com",
      "https://receipt-view.zeipt.com",
      "https://staging.zeipt.com",
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin!)) {
      res.setHeader("Access-Control-Allow-Origin", origin!);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    try {
      let url;
      if (public_view !== "true") {
        url =
          "https://receipt.staging.api.zeipt.io/v3.0/embedded/users/" +
          user_id +
          "/receipts/" +
          zeipt_receipt_transnr +
          "?token=" +
          authHeader.replace("Bearer ", "") +
          "&lang=no&template=0&pdf=true";
      } else {
        url =
          "https://receipt.staging.api.zeipt.io/v3.0/view/users/" +
          user_id +
          "/receipts/" +
          zeipt_receipt_transnr +
          "?lang=no&template=0&pdf=true";
      }

      const browser = await getBrowserInstance();
      const page = await browser.newPage();
      page.setJavaScriptEnabled(false);
      await page.addStyleTag({
        url: "https://receipt.staging.api.zeipt.io/styles.css",
      });

      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const headers = request.headers();
        headers["Authorization"] = "Bearer adasd";
        request.continue({ headers });
      });

      await page.goto(url as string, {
        waitUntil: "networkidle0",
      });

      let height = await (
        page.evaluate as (pageFunction: () => number) => Promise<number>
      )(() => document.documentElement.offsetHeight);

      const pdf = await page.pdf({
        width: "609px",
        height: height + 100 + "px",
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=receipt.pdf`);

      res.send(pdf);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while generating the PDF");
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

/* 53ba799b-3a16-4e87-9dda-af688b30d576 */
/* gcloud builds submit --tag gcr.io/zeipt-receipt/nextjsreceiptimage */
/* gcloud run deploy --image gcr.io/zeipt-receipt/nextjsreceiptimage --platform managed --allow-unauthenticated */
/* http://localhost:3002/v3.0/external/users/01G3EZTHEHRGQMBMYFHCC34EHY/receipts/01G3EZTHEHEYCQCCT21EWT5MTR */
