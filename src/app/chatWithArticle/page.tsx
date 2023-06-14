'use client'
import * as React from 'react';
import Chat, { scrollToBottom } from '../components/chatbot/Chat';
import { ChatMessageProps } from '../components/chatbot/ChatMessages';
import { basicChat } from '../functions/chatFunctions';


const messagesInit: ChatMessageProps[] = []

export default function BasicChat() {
    const [messages, setMessages] = React.useState(messagesInit);
    
    const sendMessage = async (message: string) => {
        // await setTimeout(() => {}, 10);
        const messagesToSend = messages;
        if (messages[messages.length-1]?.content !== message) {
            messagesToSend.push({ role: 'user', content: message });
        }
        await basicChat(messagesToSend).then(res => {
            setMessages(m => [...m, { role: 'assistant', content: res }]);
            setTimeout(scrollToBottom, 100);
        }).catch(err => {
            setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I ran into the following issue: ' + err }]);
            setTimeout(scrollToBottom, 100);
        })
    };
    
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Chat messages={messages} title='ArticleChatBot' sendMessage={sendMessage} setMessages={setMessages}/>
        </div>
    )
}
