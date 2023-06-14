import React from 'react';
import ChatMessages, { ChatMessageProps } from './ChatMessages';
import ChatInput from './ChatInput';
export default function Chat ({ messages, title, sendMessage, setMessages }: ChatProps) {
    async function onSendMessage(message: string) {
        setMessages(m => [...m, { role: 'user', content: message }]);
        sendMessage(message);
        await setTimeout(() => {
            scrollToBottom();
        }, 100);
    }
    function scrollToBottom() {
        const chatMessagesContainer = document.querySelector('.chat-messages');
        if (chatMessagesContainer) {
          chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
      };
    
    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-header-title">{title}</div>
            </div>
            <ChatMessages messages={messages}/>
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