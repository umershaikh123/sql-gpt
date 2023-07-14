 


 


import { NextResponse } from 'next/server';
 
 
export const runtime = 'edge'
 
let formated_code:any;


export async function POST(request: Request) {
	 
	formated_code = await request;
	// NextResponse.json({ sqlCode: formated_code});
	  
}

export async function GET(request: Request) {
	 
	NextResponse.json({ sqlCode: formated_code});
	  
}