'use server'
import PocketBase from 'pocketbase';
import dotenv from 'dotenv';
import { ArticleContent, getArticleContentFromURL } from './getArticleContent';

dotenv.config();
const pb = new PocketBase(process.env.POCKETBASE_URL);

export async function saveArticle(url: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const articleContent: ArticleContent | void = await getArticleContentFromURL(url)
        .then((content) => content)
        .catch((err) => reject(new Error('Unable to load Article Content. ' + err)));
        console.log(articleContent);
        if (articleContent === undefined || articleContent?.error || !articleContent?.content) {
            reject(new Error("Unable to load Article Content"));
        }
        console.log(articleContent)
        const data = {
            url,
            content: articleContent?.content || "",
            title: articleContent?.title || "",
        }
        console.log(data);
        const record = await pb.collection('articles').create(data).then((record) => record).catch((err) => reject(new Error(err)));
        resolve(record?.id || "");
    })
}

export async function getArticle(id: string): Promise<{title: string, content: string, url:string}> {
    return new Promise(async (resolve, reject) => {
        const record = await pb.collection('articles').getOne(id, {
            expand: 'content,title,url',
        }).catch((err) => reject(err));
        resolve({
            title: record?.title || "",
            content: record?.content || "",
            url: record?.url || "",
        });
    })
}

export async function getAllArticles(): Promise<Array<{ id: string, url: string, title: string }>> {
    return new Promise(async (resolve, reject) => {
        const records = await pb.collection('articles').getFullList().then((records) => records).catch((err) => reject(err));
        const articles = records?.map((record) => ({
            id: record.id,
            url: record.url,
            title: record.title,
        })) || [];
        resolve(articles);
    })
}