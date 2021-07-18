import puppeteer from "puppeteer";

export default async (html = "") => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
  
    await page.setContent(html);
  
    const content = await page.$("#body");
    const imageBuffer = await content.screenshot({ omitBackground: true });
  
    await page.close();
    await browser.close();
  
    return imageBuffer;
  };