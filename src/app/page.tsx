'use client'
import * as React from 'react';
import Articles, { Article } from './components/articles/Articles';
import { getAllArticles } from './functions/articleDBOperations';

const articlesInit: Article[] = [];

export default function Home() {
    const [articles, setArticles] = React.useState(articlesInit);
    React.useEffect(() => {
        const getArticleList = async () => {
            getAllArticles().then(res => {
                setArticles(res || []); 
            }).catch(err => {
                console.log('error', err)
            })
        }

        getArticleList();
    }, []);
    return (
        <div style={{width: '100vw', height: '100vh', margin: 0}}>
            <Articles articles={articles}/>
        </div>
    )
}


