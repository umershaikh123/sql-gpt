 

import { NextResponse } from 'next/server';
 
import { promises as fsPromises } from 'fs';
export async function GET() {
  return NextResponse.json({ hello: 'world' });
}
 

interface Chat {
  id: string;
  title: string;
  messages: string[];
}

export async function POST(request: Request) {
  const chats: Chat[] = await request.json();
  const jsonChats = JSON.stringify(chats, null, 2);

  try {
    await fsPromises.writeFile('chats.json', jsonChats);
    return NextResponse.json({ message: 'Chats saved successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error saving chats' }, { status: 500 });
  }

 
}