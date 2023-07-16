 

import { NextResponse } from 'next/server';
 
import { promises as fsPromises } from 'fs';
 

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: string
  role: 'function' | 'user' | 'assistant' | 'system'
  content: string
}



export async function POST(req: Request ,  params: { params: { chatid: string } } ) {
 

  try {
    const chatId = params.params.chatid;
    const  messages   = await req.json();
 
  
        //     console.log('text api chat.content ', messages.Messages[0].content)
        // const userMessage = messages.Messages.find(
        //   message => message.role === 'user'
        // )
        // if (userMessage) {
        //   const userMessageContent = userMessage.content
        //   console.log(userMessageContent)
        // } else {
        //   console.log('No user message found in chat messages.')
        // }

  
  const chatsFilePath = './Text_ER_chats.json'; // Path to the chats.json file

 
  // Read the existing chats data from the JSON file
  
  
  const chatsData: Chat[] = JSON.parse(await fsPromises.readFile(chatsFilePath, 'utf-8'));

const chatIndex = chatsData.findIndex((chat) => chat.id === chatId);

console.log("chatIndex" , chatIndex);
console.log("chatsData" , chatsData);

  if (chatIndex !== -1) {
    // Update the messages for the chat
    chatsData[chatIndex].messages = messages;
 
    // Write the updated chats data back to the JSON file
    
     
    await fsPromises.writeFile(chatsFilePath, JSON.stringify(chatsData, null, 2));
  



    return NextResponse.json({ result: 'Messages saved successfully' });
  } else {
    NextResponse.json({ result: 'Chat not found' }, { status: 400 });
  }
 

}

catch (error) {
  console.error(error);
  return NextResponse.json({ result: 'Internal Server Error2' }, { status: 500 });
}


}



  export async function DELETE(req:Request ,  params: { params: { chatid: string } } ) {
 
    try {  
      const chatId = params.params.chatid;
  const chatsFilePath = './Text_ER_chats.json'; // Path to the chats.json file

  const chatsData: Chat[] = JSON.parse(await fsPromises.readFile(chatsFilePath, 'utf-8'));

  const chatIndex = chatsData.findIndex((chat) => chat.id === chatId);

  if (chatIndex !== -1) {
    const removedChat = chatsData.splice(chatIndex, 1);

    await fsPromises.writeFile(chatsFilePath, JSON.stringify(chatsData, null, 2));

    return NextResponse.json(removedChat);
  } else {
    return NextResponse.json({ message: 'Chat not found' });
  }
} catch (error) {
  console.error(error);
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}
 
}  
 
