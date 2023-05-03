import puppeteer from 'puppeteer-core';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.query;
    const { searchParams, pathname } = new URL(url as string);
    const queryParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN || '/usr/bin/chromium-browser',
      args: ['--no-sandbox']
    });


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