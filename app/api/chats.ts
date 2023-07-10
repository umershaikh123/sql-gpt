import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';


interface Chat {
    id: string
    title: string
    messages: string[]
  }
  
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const chats: Chat[] = req.body;
    const jsonChats = JSON.stringify(chats, null, 2);

    fs.writeFile('chats.json', jsonChats, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving chats' });
      } else {
        res.json({ message: 'Chats saved successfully' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}