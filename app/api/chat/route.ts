
 





import { OpenAIStream  } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
 


// import SqlFormatter from "sql-formatter";

 
 

import { SequentialChain, LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

import { StreamingTextResponse, LangChainStream } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
 
 
export const runtime = 'edge'
 
export async function POST(req: Request) {
	const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  
});
const openai = new OpenAIApi(config);
  const { messages } = await req.json()


    let lastUserMessageContent = null;
  console.log("messages.length" , messages.length);
  
for (let i = messages.length - 1; i >= 0; i--) {
  if (messages[i].role === 'user') {
    lastUserMessageContent = messages[i].content;
    break;
  }
}

console.log("lastUserMessageContent" , lastUserMessageContent);

const userPrompt = lastUserMessageContent
	

  const llm = new ChatOpenAI({
    streaming: true,
	openAIApiKey:   process.env.OPENAI_API_KEY,
  })
 
const first_template = `
You are a powerful SQL Agent powered by OpenAI's language model. 
You will assists users in converting text requirements from user_prompt into SQL code . It could be Oracle , mySQL, postgresSQL , SQLite or any other relational database specified by user ,
 if the user does not specify the database just convert it into mySQL code. To ensure accurate assistance, 
The requirements should be relevant to SQL and align with the syntax 
and functionality typically associated with SQL databases. If the provided requirements are not related to SQL or do not seem valid,
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
you are using an SQL application powered by GPT to convert requirements into SQL code.      
If you feel some requirements are unclear ,missing or vaugue then make any valid and logical assumptions about the given requirements and add additional requirements as suitable , Also mention these additional changes.                                                  
 
Generate MySQL code to create the required tables based on the extracted information. The code should include table names, attributes, data types, and any constraints, such as primary keys.

verify the syntax for any errors
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

`



// const third_prompt = new PromptTemplate({
// 	template : third_template,
// 	inputVariables: ["sql_code"],
//   });

 
//   const Chain_three = new LLMChain({
// 	llm,
// 	prompt: third_prompt,
// 	outputKey: "tested_sql_code",
//   });



  const overallChain = new SequentialChain({
	// chains: [Chain_one , Chain_two, Chain_three],
	chains: [Chain_one , Chain_two],
	inputVariables: ["user_prompt"],
	// Here we return multiple variables
	// outputVariables: ["requiments" , "sql_code" , "tested_sql_code"],
	outputVariables: ["requiments" , "sql_code"],
	verbose: true,
  });


  const chainExecutionResult = await overallChain.call({
	user_prompt  : userPrompt ,
  });

//   const result = JSON.stringify(chainExecutionResult);
  const result= chainExecutionResult.toString();

  console.log("chainExecutionResult " , chainExecutionResult);
  console.log("result" , result);
  
  
  	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		stream: true,
		messages: [
			{ role: 'assistant', content: `
			you are a SQL assistant , your job is to format the the given code
			
			For Example :

			user : 'Based on the given task, I will assume the following requirements:\n\n1. We need to create three tables named "Customers", "Orders", and "Products".\n2. The "Customers" table will have attributes such as "customer_id" (primary key), "name", "email", and "address".\n3. The "Orders" table will have attributes such as "order_id" (primary key), "customer_id" (foreign key referencing "Customers" table), "order_date", and "total_amount".\n4. The "Products" table will have attributes such as "product_id" (primary key), "name", "price", and "stock_quantity".\n\nBased on these assumptions, below is the MySQL code to create the required tables with the mentioned attributes and constraints:\n\nsql\n-- Create Customers table\nCREATE TABLE Customers (\n  customer_id INT PRIMARY KEY,\n  name VARCHAR(255),\n  email VARCHAR(255),\n  address VARCHAR(255)\n);\n\n-- Create Orders table\nCREATE TABLE Orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT,\n  order_date DATE,\n  total_amount DECIMAL(10, 2),\n  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)\n);\n\n-- Create Products table\nCREATE TABLE Products (\n  product_id INT PRIMARY KEY,\n  name VARCHAR(255),\n  price DECIMAL(10, 2),\n  stock_quantity INT\n);\n\n\nNote: I have made assumptions about the data types for attributes such as "name", "email", "address", "order_date", "total_amount", and "stock_quantity". These assumptions can be revised based on specific requirements and data characteristics.
			Assistant : 
      Formated code is below 
      \`\`\`sql
			-- Create Customers table
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255)
);

-- Create Orders table
CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  total_amount DECIMAL(10, 2),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Create Products table
CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  stock_quantity INT
);

\`\`\`



			` },
			// { role: 'assistant', content: 'Extract result from the following and Format the following result into more readeble SQL code and dont write anything else besides the code' },
			{ role: 'user', content: `${result}` }
		  ],
	});


	console.log();
	

const stream = OpenAIStream(response);
 

	return new StreamingTextResponse(stream);
 
 
}




//   const userPrompt =`
//   Consider a MAIL_ORDER database in which employees take orders for parts
//   from customers. The data requirements are summarized as follows:
//   -The mail order company has employees, each identified by a unique employee number, first and last name, and Zip Code.
//   -Each customer of the company is identified by a unique customer number,
//   first and last name, and Zip Code.
//   - Each part sold by the company is identified by a unique part number, a
//   part name, price, and quantity in stock.
//   -Each order placed by a customer is taken by an employee and is given a
//   unique order number. Each order contains specified quantities of one or
//   more parts. Each order has a date of receipt as well as an expected ship
//   date. The actual ship date is also recorded.
//    Design an entity–relationship diagram for the mail order database and build
//   the design using a data modeling tool such as ERwin or Rational Rose.
//   `


// Consider a MOVIE database in which data is recorded about the movie
// industry. The data requirements are summarized as follows:
// ■ Each movie is identified by title and year of release. Each movie has a
// length in minutes. Each has a production company, and each is classified
// under one or more genres (such as horror, action, drama, and so forth).
// Each movie has one or more directors and one or more actors appear in it.
// Each movie also has a plot outline. Finally, each movie has zero or more
// quotable quotes, each of which is spoken by a particular actor appearing
// in the movie.
// ■ Actors are identified by name and date of birth and appear in one or more
// movies. Each actor has a role in the movie.
// 104 Chapter 3 Data Modeling Using the Entity–Relationship (ER) Model
// ■ Directors are also identified by name and date of birth and direct one or
// more movies. It is possible for a director to act in a movie (including one
// that he or she may also direct).
// ■ Production companies are identified by name and each has an address. A
// production company produces one or more movies.
 


// Consider a CONFERENCE_REVIEW database in which researchers submit
// their research papers for consideration. Reviews by reviewers are recorded
// for use in the paper selection process. The database system caters primarily
// to reviewers who record answers to evaluation questions for each paper they
// review and make recommendations regarding whether to accept or reject
// the paper. The data requirements are summarized as follows:
// ■ Authors of papers are uniquely identified by e-mail id. First and last names
// are also recorded.
// ■ Each paper is assigned a unique identifier by the system and is described
// by a title, abstract, and the name of the electronic file containing the paper.
// ■ A paper may have multiple authors, but one of the authors is designated as
// the contact author.
// ■ Reviewers of papers are uniquely identified by e-mail address. Each reviewer’s first name, last name, phone number, affiliation, and topics of interest are also recorded.
// ■ Each paper is assigned between two and four reviewers. A reviewer rates
// each paper assigned to him or her on a scale of 1 to 10 in four categories:
// technical merit, readability, originality, and relevance to the conference.
// Finally, each reviewer provides an overall recommendation regarding
// each paper.
// ■ Each review contains two types of written comments: one to be seen by
// the review committee only and the other as feedback to the author(s).
//  Design an entity–relationship diagram for the CONFERENCE_REVIEW database and build the design using a data modeling tool such as ERwin or
// Rational Rose.





































