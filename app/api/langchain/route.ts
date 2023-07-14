
import { OpenAIStream  } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey:  
  "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" ,
  
});
const openai = new OpenAIApi(config);

 
 

import { SequentialChain, LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

import { StreamingTextResponse, LangChainStream } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIChatMessage, HumanChatMessage } from 'langchain/schema'
 
export const runtime = 'edge'
 
export async function POST(req: Request) {
  const { messages } = await req.json()
  const { stream, handlers } = LangChainStream()

  const userMessage = messages.find(message => message.role === 'user');
  const userPrompt = userMessage ? userMessage.content : null;
  
  console.log("open ai user prompt" ,userPrompt);
	

  const llm = new ChatOpenAI({
    streaming: true
  })
 
const first_template = `
You are a powerful SQL Agent powered by OpenAI's language model. 
You will assists users in converting text requirements from user_prompt into Oracle , mySQL, postgresSQL , SQLite or any other relational database specified by user ,
 if the user does not specify the database just convert it into mySQL code. To ensure accurate assistance, 
 please make sure the user requirements are in a SQL-related context. The requirements should be relevant to SQL and align with the syntax 
and functionality typically associated with SQL databases.  If the provided requirements are not related to SQL or do not seem valid,
you will politely inform you and request SQL-related requirements.
`;

const first_prompt = new PromptTemplate({
	template : first_template,
	inputVariables: ["user_prompt"],
  });

  const Chain_one = new LLMChain({
	llm,
	prompt: first_prompt,
	outputKey: "requiments",
  });


const second_template = `
If you feel some requirements are unclear ,missing or vaugue then make any valid and logical assumptions about the given requirements and add additional requirements as suitable , Also mention these additional changes.                                                  
and Follow the following steps 
Input: Accept user requirements in the form of text.

Parsing: Implement a parser to extract relevant information from the user's input, including table names, table attributes, cardinality, primary keys, and relationships between tables through foreign keys.

Table Creation: Generate MySQL code to create the required tables based on the extracted information. The code should include table names, attributes, data types, and any constraints, such as primary keys.

Cardinality and Relationships: Identify the cardinality between tables (e.g., one-to-one, one-to-many, many-to-many) based on the user's input. Generate the appropriate MySQL code to set up relationships between tables using foreign keys.

Output: Provide the generated MySQL code as the output of the application.
`


const second_prompt = new PromptTemplate({
	template : second_template,
	inputVariables: ["requiments"],
  });

  const Chain_two = new LLMChain({
	llm,
	prompt: second_prompt,
	outputKey: "sql_code",
  });

const third_template = `
Ensure that the application handles various user requirements and can parse them accurately, even if the input text structure or wording may vary.

Handle errors and provide appropriate feedback when the input requirements cannot be parsed or contain inconsistencies.

 

Provide an option for the user to specify any additional requirements, such as table constraints, indexes, or triggers, and incorporate them into the generated MySQL code.

Implement suitable validation mechanisms to ensure the generated MySQL code is syntactically correct and avoids common mistakes or vulnerabilities, such as SQL injection.

Consider implementing a user-friendly interface for the application, allowing users to interactively provide their requirements and receive the generated MySQL code as output.

Document the application thoroughly, including the user interface, input requirements, parsing rules, and code generation process.

Consider performance optimizations, such as caching frequently accessed data, to improve the efficiency of the application during repeated usage.

Aim for code modularity, reusability, and maintainability to facilitate future updates or enhancements to the application.

Test the application thoroughly with a variety of user input scenarios to ensure its accuracy, reliability, and robustness.

Provide proper error handling and clear messages to assist users in understanding any issues or conflicts in their input requirements.

Consider incorporating security measures, such as authentication and authorization, to protect the application and the generated MySQL code from unauthorized access or modification.

Consider implementing version control or backup mechanisms to prevent data loss and provide the ability to revert to previous versions of the generated MySQL code.

Overall, design an application that can accurately convert user requirements, expressed in text, into well-structured MySQL code, while considering usability, performance, security, and maintainability aspects.                                               
`



const third_prompt = new PromptTemplate({
	template : third_template,
	inputVariables: ["sql_code"],
  });

 
  const Chain_three = new LLMChain({
	llm,
	prompt: third_prompt,
	outputKey: "tested_sql_code",
  });



  const overallChain = new SequentialChain({
	chains: [Chain_one , Chain_two, Chain_three],
	inputVariables: ["user_prompt"],
	// Here we return multiple variables
	outputVariables: ["requirements" , "sql_code" , "tested_sql_code"],
	verbose: true,
  });


  const chainExecutionResult = await overallChain.call({
	user_prompt  : userPrompt ,
  });


 
 
  return new StreamingTextResponse(stream)
}