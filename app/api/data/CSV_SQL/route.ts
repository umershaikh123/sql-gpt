 

import { NextResponse } from 'next/server';
 
import { promises as fsPromises } from 'fs';
 

interface Chat {
  id: string;
  title: string;
  messages: string[];
}

export async function POST(request: Request) {
  const chats: Chat[] = await request.json();
  const jsonChats = JSON.stringify(chats, null, 2);

  try {
    await fsPromises.writeFile('CSV_SQL_chats.json', jsonChats);
    return NextResponse.json({ message: 'Chats saved successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error saving chats' }, { status: 500 });
  }

 
}


export async function GET(request:Request) {
   
      try {
        const fileData = await fsPromises.readFile('CSV_SQL_chats.json', 'utf-8');
        const chats: Chat[] = JSON.parse(fileData);
  
        return NextResponse.json(chats);
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error retrieving chats' }, { status: 500 });
      }
     
  }

 

//   export async function DELETE(req:Request ) {
//     const { searchParams } = new URL(req.url)
//     const chatId = searchParams.get('chatId')
//     const chatsFilePath = './chats.json'; // Path to the chats.json file

//     // Read the existing chats data from the JSON file
//     // const chatsData: Chat[] = JSON.parse(fs.readFileSync(chatsFilePath, 'utf-8'));
//     const chatsData: Chat[] = JSON.parse(await fsPromises.readFile(chatsFilePath, 'utf-8'));

//     // Find the index of the chat to be removed
//     const chatIndex = chatsData.findIndex((chat) => chat.id === chatId);

//     if (chatIndex !== -1) {
//       // Remove the chat from the chatsData array
//       const removedChat = chatsData.splice(chatIndex, 1);

//       // Write the updated chatsData back to the JSON file
//     //   fs.writeFileSync(chatsFilePath, JSON.stringify(chatsData, null, 2));
//     await fsPromises.writeFile(chatsFilePath, JSON.stringify(chatsData, null, 2));

//       NextResponse.json(removedChat);
//     } else {
//         NextResponse.json({ message: 'Chat not found' });
//     }
//   }  
 