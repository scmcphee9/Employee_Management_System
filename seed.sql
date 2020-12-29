DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary VARCHAR(30),
  deparment_id INT
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_namen VARCHAR(30),
role_id INT,
manager_id INT
);

INSERT INTO department (deptname) VALUES ("Engineering"),("Finance"),("Legal"),("Sales");
INSERT INTO roles (title, salary, department_id) VALUES("Sales Lead", 100000, 4),("Salesperson", 80000, 4),("Lead Engineer", 150000, 1),("Software Engineer", 100000, 1),("Account Manager", 160000, 2),("Accountant", 95000, 2),("Legal Team Lead", 200000, 3),("Lawyer", 190000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Joe", "Schmoe", 1, 0),("John", "Doe", 2, 1),("Sneaky", "Pete", 3,0),("Jane", "Doe", 4, 1),("Mary", "Contrary", 5, 1),("Tom", "Hanks", 6, 1),("Billy", "Joel", 7, 1),("Dolly", "Parton", 8, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;