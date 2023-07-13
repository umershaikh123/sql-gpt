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

  CREATE TABLE Order (
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
    FOREIGN KEY (order_id) REFERENCES Order(order_id),
    FOREIGN KEY (part_id) REFERENCES Part(part_id)
  );

--   sql2dbml --mysql dump.sql -o mydatabase.dbml