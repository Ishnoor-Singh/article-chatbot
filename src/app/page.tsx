'use client'
import * as React from 'react';
import { getArticleContentFromURL } from './functions/getArticleContent'; 
export default function Home() {
    const [html, setHtml] = React.useState('');
    React.useEffect(() => {
        async function fetchHtml() {
            await getArticleContentFromURL('https://gamerant.com/best-open-world-games-switch-brain-off-while-playing/')
            .then((html) => {
                console.log('html', html)
                setHtml(html);
            }).catch((err) => {
                console.error(err);
                setHtml('<h1>Something went wrong</h1>');
            })
        }
        fetchHtml();
    }, []);
    return (
        <>
            <h1>Article Chatbot</h1>
            <div dangerouslySetInnerHTML={{__html: html}} />
        </>
    )
}
