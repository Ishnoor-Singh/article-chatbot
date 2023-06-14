'use client'
import ReactMarkdown from 'react-markdown';
export default function ChatMessages({ messages }: ChatMessagesProps) {
    return (
        <div className='chat-messages'>
            {messages.map((message, index) => {
                return (
                    <ChatMessage role={message.role} content={message.content} key={index}/>
                )
                })
            }
        </div>
    )
}

function ChatMessage({ role, content }: ChatMessageProps) {
    return (
        <div className='chat-message'>
            <div className={`chat-message-content ${role === 'assistant'? 'from': 'to'}`}>
                <ReactMarkdown>
                    { content }
                </ReactMarkdown>
            </div>
        </div>
    )
}

export type ChatMessageProps = {
    // update role to union of strings
    'role': string;
    'content': string;
}

export type ChatMessagesProps = {
    'messages': ChatMessageProps[];
}