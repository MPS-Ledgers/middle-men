import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import './chat.css'
const Chat=()=> {
    return (
        <ChatEngine
            height='100vh'
            userName='abc@x.com'
            userSecret='123456'
            projectID='3a749869-1abb-4bd5-8a4a-9d34ba95e983'
        />
    );
}

export default Chat