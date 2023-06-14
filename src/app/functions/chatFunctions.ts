'use server'

const { Configuration, OpenAIApi } = require("openai");
import { ChatMessageProps } from '../components/chatbot/ChatMessages';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const MODEL = "gpt-4";
 

export async function basicChat(messages: ChatMessageProps[]):Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const chatCompletion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })
            if (chatCompletion.data.choices[0].message.content) {
                resolve(chatCompletion.data.choices[0].message.content)
            } else {
                reject("No response from OpenAI")
            }
        } catch (err) {
            console.log(err)
            reject(JSON.stringify(err))
        }
    })
}