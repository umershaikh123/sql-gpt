 

import { NextResponse } from 'next/server';
 
import { promises as fsPromises } from 'fs';
 

interface Chat {
  id: string;
  title: string;
  messages: string[];
}

 
 

 

 

  export async function DELETE(req:Request ,  params: { params: { chatid: string } } ) {
 
 
 

 try {
  const chatId = params.params.chatid;
  const chatsFilePath = './ER_SQL_chats.json'; // Path to the chats.json file

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
 