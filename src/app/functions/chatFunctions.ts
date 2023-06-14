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
                model: MODEL,
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

export async function chatWithArticleContext(messages: ChatMessageProps[], articleContent: string):Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const chatCompletion = await openai.createChatCompletion({
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: "The following conversation is with an AI assistant with knowledge of the article: \n" + articleContent + "\n\n"
                    },
                    ...messages], 
            })
            console.log(chatCompletion.data.choices)
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