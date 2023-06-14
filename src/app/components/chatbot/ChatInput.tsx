'use client';
import * as React from 'react';
export default function ChatInput({ sendMessage }: ChatInputProps) {
    const [message, setMessage] = React.useState('');

    function onSubmitMessage(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            sendMessage(message);
            setMessage('');
        }
    }
    return (
        <div className="chat-input-section">
            <input
                type="text" className="chat-input" placeholder="Type a message..."
                value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="chat-send-button" onClick={onSubmitMessage}>Send</button>
        </div>
    )
}

export type ChatInputProps = {
    "sendMessage": (message: string) => void;
}