'use client'
import ReactMarkdown from 'react-markdown';
export default function ChatMessages({ messages, loading }: ChatMessagesProps) {
    return (
        <div className='chat-messages'>
            {messages.map((message, index) => {
                return (
                    <ChatMessage role={message.role} content={message.content} key={index}/>
                )
                })
            }
            {loading && <Loading/>}
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

function Loading () {
    return (
        <div className='laoding-container info'>
            Loading 
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
    'loading': boolean;
}