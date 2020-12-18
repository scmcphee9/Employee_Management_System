const inquirer = require("inquirer");
const mysql = require("mysql");

//ascii art
// const logo = require('asciiart-logo');
// const config = require('./package.json');
// console.log(logo(config).render())

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
  init();
});

const init = () => {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee roles",
        "Quit",
      ],
    })
    .then(({ choices }) => {
      switch (choices) {
        case "View all departments":
          return viewDepartments();
        case "View all roles":
          return viewRoles();
        case "View all employees":
          return viewEmployees();
        case "Add department":
          return addDepartment();
        case "Add role":
          return addRole();
        case "Add employee":
          return addEmployee();
        case "Update employee roles":
          return updateEmployee();
        case "Quit":
          connection.end();
      }
    });
};

// allemplyoee function - query database and return data - left join

// all employee by department - prompt engineering, finance, legal, sales. connection.query

const viewDepartments = () => {
  // inquirer.prompt([{}])
  // console.log("Departments");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    return console.log(res);
  });
  init();
};

const viewRoles = () => {};
const viewEmployees = () => {};
const addDepartment = () => {};
const addRole = () => {};
const addEmployee = () => {};
const updateEmployee = () => {};
