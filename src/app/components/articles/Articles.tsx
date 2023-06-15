import Link from "next/link";
import AddArticle from "./AddArticle";
import dotenv from 'dotenv';

export default async function Articles() {
//     const articles: any[] = await getAllArticles();
    const articles: any[] = await getArticleList();

    return (
        <div className="page-container">
            <div className="half-page-container article-links-container">
                {articles?.map(article =>  
                <Link key={article.id} href={`/chatWithArticle/${article.id}`}>
                    <div className="article-link">{article.title}</div>  
                </Link>)}
            </div>
            <AddArticle/>
        </div>
    )
}

const getArticleList = async () => {
    dotenv.config();

    const res = await fetch(`http://127.0.0.1:8090/api/collections/articles/records?page=1&perPage=30`, { cache: 'no-store' });
    const data = await res.json();
    console.log(data);
    return data?.items as any[];
    // // return await (new PocketBase(process.env.POCKETBASE_URL)).collection('articles').getList(1, 100).then((records) => records.items)
    // return await getAllArticles()
}

// async function ArticleList() {
//     // const articles = await getArticleList();
//     const articles = [];
//     return (
//         <div className="half-page-container article-links-container">
//             {articles?.map(article => <Article key={article.id} title={article.title}/>)}
//         </div>
//     )
// }

// function Article({ id, title }: Article) {
//     return (
//             <Link href={`/chatWithArticle/${id}`}>
//                 <div className="article-link">{title}</div>  
//             </Link>
//     )
// }

export type Article = {
    "id": string;
    "title": string;
    "url"?: string;
    "content"?: string;
}

export type ArticlesProps = {
    "articles": Article[];
}