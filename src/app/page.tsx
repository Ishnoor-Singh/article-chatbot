'use client'
import * as React from 'react';
import ArticleRenderer from './components/utils/ArticleRenderer';

export default function Home() {
    return (
        <>
            <h1>Article Chatbot</h1>
            <ArticleRenderer url = 'https://techcrunch.com/2023/06/07/blush-ai-dating-sim-replika-sexbot/'/>
        </>
    )
}
