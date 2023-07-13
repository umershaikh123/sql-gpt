import mysql from 'mysql';
// const mysql = require('mysql')

const Pool = mysql.createPool({
    host: 'localhost',
    // host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'demo',
  });
  
  export  { Pool };

//   port 3306