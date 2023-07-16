 

import { NextResponse } from 'next/server';
 
import { promises as fsPromises } from 'fs';
 
// const { exec } = require('child_process');
import { exec } from 'child_process';

// const sqlFilePath = 'schema.sql';
const outputFilePath = 'mydatabase.dbml';

export async function POST(req: Request) {
  const resp= await req.json()

  const path  =  resp.filePath
  const output = `ER-file-${Date.now()}.dbml`;

  const command = `sql2dbml --mysql ${path} -o ${output}`;


  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing sql2dbml command: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`sql2dbml command encountered an error: ${stderr}`);
      return;
    }

    console.log('sql2dbml command executed successfully.');
    console.log(`Output file generated at: ${output}`);
  });

  // const command2 =  `dbdocs build mydatabase.dbml --project demo`

  // exec(command2, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing dbdocs command: ${error}`);
  //     return;
  //   }

  //   if (stderr) {
  //     console.error(`dbdocs command encountered an error: ${stderr}`);
  //     return;
  //   }

  //   const linkRegex = /Visit:\s+(https?:\/\/\S+)/;
  //   const linkMatch = stdout.match(linkRegex);

  //   if (linkMatch) {
  //     const generatedLink = linkMatch[1];
  //     console.log('dbdocs command executed successfully.');
  //     console.log(`Generated link: ${generatedLink}`);
  //     return generatedLink;
  //   } else {
  //     console.error('Failed to retrieve generated link from dbdocs command output.');
  //     return null;
  //   }


  
    
  // });
 
}

 

 
 
 