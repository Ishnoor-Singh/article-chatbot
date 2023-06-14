'use client'
import * as React from 'react';
import Chat from './components/chatbot/Chat';
import { ChatMessageProps } from './components/chatbot/ChatMessages';

const messagesInit: ChatMessageProps[] = [
    { role: 'assistant', content: 'Hello, how can I help you?' },
    { role: 'user', content: 'Hi, I have a question about your product.' },
    { role: 'assistant', content: 'Sure, what would you like to know?' },
    { role: 'user', content: 'I want to know if your product is compatible with my device.' },
    { role: 'assistant', content: 'What device do you have?' },
    { role: 'user', content: 'I have an iPhone 12.' },
    { role: 'assistant', content: 'Yes, our product is compatible with the iPhone 12.' },
    { role: 'user', content: 'Great, thanks for letting me know.' },
    { role: 'assistant', content: 'You\'re welcome. Is there anything else I can help you with?' },
    { role: 'user', content: 'No, that\'s all. Thanks for your help.' },
  ];

export default function Home() {
    const [messages, setMessages] = React.useState(messagesInit);
    
    const sendMessage = (message: string) => {
        // for now this just creates an echo message
        setMessages(m => [...m, { role: 'assistant', content: 'you said ' + message }]);
    };
    
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Chat messages={messages} title='ArticleChatBot' sendMessage={sendMessage} setMessages={setMessages}/>
        </div>
    )
}
