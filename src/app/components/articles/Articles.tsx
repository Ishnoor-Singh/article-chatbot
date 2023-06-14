import Link from "next/link";
import AddArticle from "./AddArticle";


export default function Articles({articles}: ArticlesProps) {
    return (
        <div className="page-container">
            <AddArticle/>
            <div className="half-page-container article-links-container">
                {articles && articles.map(article => <Article key={article.id} {...article}/>)}
            </div>
        </div>
    )
}

function Article({ id, title }: Article) {
    return (
            <Link href={`/chatWithArticle/${id}`}>
                <div className="article-link">{title}</div>  
            </Link>
    )
}

export type Article = {
    "id": string;
    "title": string;
    "url"?: string;
    "content"?: string;
}

export type ArticlesProps = {
    "articles": Article[];
}