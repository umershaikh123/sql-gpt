
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
	// apiKey: process.env.OPENAI_API_KEY,
//   apiKey:  
//   "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" ,

  apiKey:  
  "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" ,
  
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
	const { messages } = await req.json();
	console.log(messages);
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		stream: true,
		messages,
	});

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
}

// import { Configuration, OpenAIApi } from 'openai-edge'
// import { OpenAIStream, StreamingTextResponse } from 'ai'
 
// // Create an OpenAI API client (that's edge friendly!)
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// })
// const openai = new OpenAIApi(config)
 
// // IMPORTANT! Set the runtime to edge
// export const runtime = 'edge'
 
// export async function POST(req: Request) {
//   // Extract the `messages` from the body of the request
//   const { messages } = await req.json()
 
//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages
//   })
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response)
//   // Respond with the stream
//   return new StreamingTextResponse(stream)
// }