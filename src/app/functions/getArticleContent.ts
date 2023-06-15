'use server'

import TurndownService from 'turndown';
import puppeteer from 'puppeteer'

// not instantiating in every call should help
const turndownService = new TurndownService();

export async function getArticleContentFromURL(url: string): Promise<ArticleContent> {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch(
	      {
		         args: ['--no-sandbox']
	      }
      );
      const page = await browser.newPage();
      await page.goto(url);
      const [articleContent, title] = await page.evaluate(() => {
        const article = document.querySelector('article');
        if (article !== undefined && article !== null) {
          return [article.innerHTML, document.querySelector('title')?.innerHTML || url];
        }
        else {
          return [page.content(), document.querySelector('title')?.innerHTML || url];
        }
      });
      await browser.close();
      const articleContentInMarkdown = turndownService.turndown(await articleContent);
      resolve({content: articleContentInMarkdown, title: await title});
    } catch (err) {
      // console.log(err);
      // reject(() => ({
      //   title: null,
      //   content: null,
      //   error: err
      // }));
      reject(new Error(err + '' || "Unable to load Article Content"));
    }
  });
}

export type ArticleContent = {
  title: string,
  content: string,
  error?: string,
}
