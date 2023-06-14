'use server'

import TurndownService from 'turndown';
import puppeteer from 'puppeteer'

// not instantiating in every call should help
const turndownService = new TurndownService();

export async function getArticleContentFromURL(url: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const articleContent = await page.evaluate(() => {
        const article = document.querySelector('article');
        if (article) {
          return article.innerHTML;
        }
        else {
          return page.content();
        }
      });
      await browser.close();

      const articleContentInMarkdown = turndownService.turndown(articleContent);
      resolve(articleContentInMarkdown);
    } catch (err) {
      reject(err);
    }
  });
}