import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
const SqlFormatter = require("sql-formatter")
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey:  "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" ,
});
const openai = new OpenAIApi(config);
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // const { prompt } = await req.json();
  const { messages } = await req.json()
  console.log("messages" ,messages);

  const userMessage = messages.find(message => message.role === 'user');
  const userPrompt = userMessage ? userMessage.content : null;
  
  console.log("userPrompt" ,userPrompt);
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		stream: true,
		messages: [
			{ role: 'system', content: 'you are a SQL assistant , your job is to format the result' },
			{ role: 'assistant', content: 'Extract result from the following and Format the following result into more readeble SQL code and dont write anything else besides the code' },
			{ role: 'user', content: `format this result code ${userPrompt}` }
		  ],
	});

  console.log("response" ,response);

// const formattedSqlCode = SqlFormatter.format(response.choices[0]?.message?.content);

// console.log("chat api format code" ,formattedSqlCode);

//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     stream: true,
//     temperature: 0.6,
//     prompt: `Create three slogans for a business with unique features.
 
// Business: Bookstore with cats
// Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
// Business: Gym with rock climbing
// Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
// Business: ${prompt}
// Slogans:`,
//   });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}







// import { OpenAIStream , streamToResponse } from "ai";
// import { StreamingTextResponse, LangChainStream } from 'ai'
// import { useChat } from 'ai/react'

// export async function POST(req: Request) {
// 	// const { messages, input, handleInputChange, handleSubmit } = useChat()

// const { Configuration, OpenAIApi } = require("openai");
// const { messages } = await req.json()


// let lastUserMessageContent = null;
// console.log("messages.length" , messages.length);

// for (let i = messages.length - 1; i >= 0; i--) {
// if (messages[i].role === 'user') {
//   lastUserMessageContent = messages[i].content;
//   break;
// }
// }

// console.log("lastUserMessageContent" , lastUserMessageContent);

// const userPrompt = lastUserMessageContent

// const configuration = new Configuration({
// 	apiKey:  
// 	"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" ,
// });
// const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{"role": "system", "content": "You are a helpful assistant."}, 	{ role: 'user', content: `${userPrompt}` }],
// });
// console.log(completion.data.choices[0].message);

 
// return completion.data.choices[0].message
// }

