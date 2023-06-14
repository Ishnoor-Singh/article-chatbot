import React from 'react';
import ChatMessages, { ChatMessageProps } from './ChatMessages';
import ChatInput from './ChatInput';
export default function Chat ({ messages, title, sendMessage, setMessages }: ChatProps) {
    const [loading, setLoading] = React.useState(false);

    async function onSendMessage(message: string) {
        setLoading(true);
        setTimeout(scrollToBottom, 100);
        setMessages(m => [...m, { role: 'user', content: message }]);
        await sendMessage(message)
        setLoading(false);
        setTimeout(scrollToBottom, 100);
    }

    
    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-header-title">{title}</div>
            </div>
            <ChatMessages messages={messages} loading={loading}/>
            <ChatInput sendMessage={onSendMessage}/>
        </div>
    )
}

export type ChatProps = {
    "messages": ChatMessageProps[];
    "title": string;
    "sendMessage": (message: string) => void;
    "setMessages": React.Dispatch<React.SetStateAction<ChatMessageProps[]>>;
}


export function scrollToBottom() {
    const chatMessagesContainer = document.querySelector('.chat-messages');
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
}; 