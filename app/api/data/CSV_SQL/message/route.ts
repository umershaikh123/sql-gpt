
 

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




export async function GET(request:Request) {
   
  try {
    const fileData = await fsPromises.readFile('CSV_SQL_chats.json', 'utf-8');
    const chats: Chat[] = JSON.parse(fileData);
    console.log("chats " , chats);
    
    return NextResponse.json(chats);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error retrieving chats' }, { status: 500 });
  }
 
}
