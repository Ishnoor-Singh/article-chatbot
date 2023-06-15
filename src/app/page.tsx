'use client'
import * as React from 'react';
import Articles, { Article } from './components/articles/Articles';

const articlesInit: Article[] = [];

// export default function Home() {
//     const [articles, setArticles] = React.useState(articlesInit);
//     React.useEffect(() => {
//         const getArticleList = async () => {
//             getAllArticles().then(res => {
//                 setArticles(res || []); 
//             }).catch(err => {
//                 console.log('error', err)
//             })
//         }

//         getArticleList();
//     }, []);
//     return (
//         <div style={{width: '100vw', height: '100vh', margin: 0}}>
//             <Articles articles={articles}/>
//         </div>
//     )
// }


export default function Home() {
    return (
        <div style={{width: '100%', height: '100%', margin: 0, padding: '0.5rem'}}>
             <Articles/>
        </div>
    )
    }
