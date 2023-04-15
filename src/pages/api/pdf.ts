import puppeteer from 'puppeteer';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import chromium from 'chrome-aws-lambda';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.query;
    const { searchParams, pathname } = new URL(url as string);
    const queryParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })
    const page = await browser.newPage();

    await page.goto(url as string, {
      waitUntil: 'networkidle2',
    });

    const pdf = await page.pdf({ format: 'a4' });

    fs.writeFileSync('page.pdf', pdf);

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=receipt.pdf`);

    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating the PDF');
  }
}
