'use client'
import * as React from 'react';
import { getArticleContentFromURL } from '@/app/functions/getArticleContent'; 
import ReactMarkdown from 'react-markdown';

type ArticleRendererProps = {
    url: string;
}

export default function ArticleRenderer({ url }: ArticleRendererProps) {
    console.log(url)
    const [md, setMd] = React.useState('');
    React.useEffect(() => {
        async function fetchMd() {
            await getArticleContentFromURL(url)
            .then((md) => {
                setMd(md?.content || "");
            }).catch((err) => {
                console.error(err);
                setMd('# Something went wrong');
            })
        }
        fetchMd();
    }, []);
    return (
        <>
            {md ? <ReactMarkdown>{ md }</ReactMarkdown> : <p>Loading...</p>}
        </>
    )
}
