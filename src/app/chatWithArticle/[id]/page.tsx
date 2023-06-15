'use client'
import * as React from 'react';
import Chat, { scrollToBottom } from '../../components/chatbot/Chat';
import { ChatMessageProps } from '../../components/chatbot/ChatMessages';
import { basicChat, chatWithArticleContext } from '../../functions/chatFunctions';
import { getArticleContentFromURL } from '../../functions/getArticleContent';
import { useRouter } from 'next/router';


const messagesInit: ChatMessageProps[] = []

export default function ChatWithArticle({params}: any) {
    const id = params.id;
  
    const [messages, setMessages] = React.useState(messagesInit);
    
    const sendMessage = async (message: string) => {
        const messagesToSend = messages;
        if (messages[messages.length-1]?.content !== message) {
            messagesToSend.push({ role: 'user', content: message });
        }
        await chatWithArticleContext(messagesToSend, id).then(res => {
            setMessages(m => [...m, { role: 'assistant', content: res }]);
            setTimeout(scrollToBottom, 100);
        }).catch(err => {
            setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I ran into the following issue: ' + err }]);
            setTimeout(scrollToBottom, 100);
        })
    };
    
    return (
        <div style={{width: '100%', height: '100%', margin: 0, padding: '0.5rem'}}>
            <Chat messages={messages} title='ArticleChatBot' sendMessage={sendMessage} setMessages={setMessages}/>
        </div>
    )
}
