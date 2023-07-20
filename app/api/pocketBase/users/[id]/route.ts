 

import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase'

 
 

export async function GET(request:Request , params: { userID: string } ) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const authData = await pb.admins.authWithPassword(
    process.env.email || 'umershaikh217@gmail.com',
    process.env.pass || 'umer123456'
  );

  const sub = params.userID;

  console.log("sub = " ,sub);
  
 
  
  
  // const { sub  } = userData.user;

  // console.log("sub = " ,sub);
  

      try {
        const resultList = await pb.collection('users').getFullList({
          filter: `authID = "${sub}"`,
        });

        console.log("resultList = " ,resultList);
        
 
        return NextResponse.json({ result: resultList }, { status: 200 });
      } 
      
      
      catch (error) {
        console.error(error);
        return NextResponse.json({ result: 'Error retrieving users' }, { status: 500 });
      }
     
  }



 

 