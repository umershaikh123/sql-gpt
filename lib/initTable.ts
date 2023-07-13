// import { pool }from './db';
// const pool = require('./db')
// import mysql from 'mysql';
// const mysql = require('mysql')
// import mysql from 'mysql2/promise';

// const createTablesQuery = `
// CREATE TABLE Customer (
//   customer_id INT PRIMARY KEY,
//   first_name VARCHAR(50),
//   last_name VARCHAR(50)
// )
// `


const mysql = require('mysql2/promise')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'demo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

const createTablesQuery = `
  CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
  );

  CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
  );

  CREATE TABLE Part (
    part_id INT PRIMARY KEY,
    part_name VARCHAR(50),
    price FLOAT,
    quantity_in_stock INT
  );

  CREATE TABLE \`Order\` (
    order_id INT PRIMARY KEY,
    customer_id INT,
    employee_id INT,
    date_of_receipt DATE,
    expected_ship_date DATE,
    actual_ship_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
  );

  CREATE TABLE OrderPart (
    order_part_id INT PRIMARY KEY,
    order_id INT,
    part_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES \`Order\`(order_id),
    FOREIGN KEY (part_id) REFERENCES Part(part_id)
  );
`;




const initializeTables = async () => {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'demo',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // await connection.query(createTablesQuery);
    await connection.query(createTablesQuery);
    console.log('Tables initialized successfully.');
  } catch (error) {
    console.error('Error initializing tables:', error);
  } finally {
    if (connection) {
      connection.end(); // Close the MySQL connection
    }
  }
};

// Call the initializeTables function
initializeTables();

// const initializeTables = async () => {
//   try {
//     await connection.query(createTablesQuery)
//     console.log('Tables initialized successfully.')
//   } catch (error) {
//     console.error('Error initializing tables:', error)
//   } finally {
//     connection.end() // Close the MySQL connection pool
//   }
// }

// // Call the initializeTables function
// initializeTables()
