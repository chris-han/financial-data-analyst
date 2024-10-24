import dotenv from 'dotenv';
import Anthropic from "@anthropic-ai/sdk";
import { APIError } from '@anthropic-ai/sdk';
dotenv.config({ path: '.env.local' });
async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const accountId = process.env.ACCOUNT_ID;
  const gatewayId = process.env.GATEWAY_ID;
  const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/anthropic`;
  const anthropic = new Anthropic({
    apiKey: apiKey,
    baseURL: baseURL
  });
  console.log(anthropic.apiKey);
  try {
    const promptText = "tell me a joke in 18 words";
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0,
      messages: [{
        role: "user",
        content: [{
          type: "text",
          text: promptText
        }]
      }]
    });
    // Extract and print the returned content from the API response
    if (msg && msg.content) {
      if(msg.content[0].type === "text"){
        const joke = msg.content[0].text;
        console.log(`Joke: ${joke}`);
      } else {
        console.error('Expected text type in response, but not found');
      }      
    } else {
      console.error('No content in response');
    }
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
