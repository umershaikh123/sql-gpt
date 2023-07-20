 

import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase'

 
export async function POST(request: Request) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const authData = await pb.admins.authWithPassword(
    process.env.email || 'umershaikh217@gmail.com',
    process.env.pass || 'umer123456'
  );

  // const {user} = await request.json();
  const userData= await request.json()

  
  const { nickname, name, picture, sub , email } = userData.user;


// console.log("userData = " ,userData);
// console.log("nickname = " ,nickname);
// console.log("name = " ,name);




  try {
    const resultList = await pb.collection('users').getFullList({
      filter: `authID = "${sub}"`,
    });

    // console.log("resultList = " ,resultList);
    

    if (resultList.length === 0) {
 
      await pb.collection('users').create({
        userName: name,
        email: email || "",
        authID: sub,
      });
      return NextResponse.json({ result: 'User created successfully' }, { status: 200} );
  } 
else {
  return NextResponse.json({ result: 'User Already Exists' }, { status: 200 });
}

}

  catch (error) {
    console.error(error);
    return NextResponse.json({ result: 'fail to create user' }, { status: 500 });
  }

 
}


 

 