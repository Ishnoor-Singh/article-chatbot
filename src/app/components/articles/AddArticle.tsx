'use client'
import { saveArticle } from "@/app/functions/articleDBOperations";
import * as React from 'react';
import { useRouter } from "next/navigation";
export default function AddArticle() {
    const [url, setUrl] = React.useState('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [messageType, setMessageType] = React.useState('success' as 'success' | 'error' | 'info' );

    
    const router = useRouter();
    const handleClick = async () => {
        setSnackbarMessage('Loading ...');
        setMessageType('info');
        await saveArticle(url).then(res => {
            console.log('added', res)
            setUrl('');
            // router.refresh();
            // router.replace();
            setSnackbarMessage('Articles loaded. Refresh to see it.');
            setMessageType('success');
            setTimeout(() => {
                setSnackbarMessage('');
            }, 3000)
        }).catch(err => {
            console.log('error', err)
            console.log(err)
            setSnackbarMessage((err + ''));
            setMessageType('error');
            setTimeout(() => {
                setSnackbarMessage('');
            }, 3000)
        })
    };
    return (
        <>
            <div className="half-page-container">
                <div>
                    <h1 className="articles-header-title">Converse with Articles</h1>
                    <input className="chat-input" placeholder="Article Url" type='text' value={url} onChange={e => setUrl(e.target.value)}/>
                    <button className="chat-send-button" onClick={handleClick}>Add article</button>
                </div>
            </div>
            {snackbarMessage && <SnackBar message={snackbarMessage} type={messageType}/>}
        </>
    )
}



function SnackBar({message, type}: {message: string, type: 'success' | 'error' | 'info'}) {
    return (
        <div className={`snackbar-container ${type}`}>
            <div className="snackbar-message">{message}</div>
        </div>
    )
}