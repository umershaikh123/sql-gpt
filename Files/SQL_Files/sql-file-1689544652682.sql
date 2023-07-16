- Create Customers table
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255)
);

-- Create Orders table
CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  total_amount DECIMAL(10, 2),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Create Products table
CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  stock_quantity INT
);