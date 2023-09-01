CREATE DATABASE Bakery_Solutions

CREATE TABLE users  (
  user_id SERIAL PRIMARY KEY,
  role VARCHAR(30) NOT NULL DEFAULT 'User',
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  is_delete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins  (
  user_id SERIAL PRIMARY KEY,
  role VARCHAR(30) NOT NULL DEFAULT 'Admin',
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  is_delete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partners (
  partner_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  is_delete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  partner_id INTEGER REFERENCES partners(partner_id) NOT NULL,
  image TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100),
  product_name VARCHAR(100) NOT NULL,
  product_description TEXT NOT NULL,
  product_count INTEGER NOT NULL,
  product_Weight VARCHAR(100) NOT NULL,
  product_price VARCHAR(100) NOT NULL,
  discount VARCHAR(100),
  charge VARCHAR(100) NOT NULL,
  out_of_stock BOOLEAN DEFAULT false,
  is_delete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders  (
  order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) NOT NULL,
  product_id INTEGER REFERENCES products(product_id) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  street_name VARCHAR(100) NOT NULL,
  postal_code VARCHAR(100) NOT NULL,
  pay_method VARCHAR(100) NOT NULL,
  name_card VARCHAR(100),
  card_number VARCHAR(100),
  security_code VARCHAR(100),
  card_expiration_date VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
  payment_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) NOT NULL,
  total_paid VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

