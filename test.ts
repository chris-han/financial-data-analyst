import dotenv from 'dotenv';
import Anthropic from "@anthropic-ai/sdk";
import { APIError } from '@anthropic-ai/sdk';

dotenv.config();

async function main() {
  const anthropic = new Anthropic({
    // apiKey: process.env.ANTHROPIC_API_KEY,
    // baseURL: 'https://anthropic.tanghan6.workers.dev/'
  });
  console.log(anthropic.apiKey);

  try {    
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0,
      messages: [{
        role: "user",
        content: [{
          type: "text",
          text: "tell me a joke in 20 words"
        }]
      }]
    });
    console.log(msg);
  } catch (error) {
    // Option 1: Type checking
    if (error instanceof APIError) {
      console.error('API Error:', error.message);
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
}
console.log("start");
main();