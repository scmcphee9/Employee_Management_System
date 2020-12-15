const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "skagwayak9",
  database: "employeeDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
});
