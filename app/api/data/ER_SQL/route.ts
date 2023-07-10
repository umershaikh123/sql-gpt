 

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
    await fsPromises.writeFile('ER_SQL_chats.json', jsonChats);
    return NextResponse.json({ message: 'Chats saved successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error saving chats' }, { status: 500 });
  }

 
}


export async function GET(request:Request) {
   
      try {
        const fileData = await fsPromises.readFile('ER_SQL_chats.json', 'utf-8');
        const chats: Chat[] = JSON.parse(fileData);
  
        return NextResponse.json(chats);
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error retrieving chats' }, { status: 500 });
      }
     
  }

 
 