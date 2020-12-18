const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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

    console.table(res);
    init();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;

    console.table(res);
    init();
  });
};
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    console.table(res);
    init();
  });
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department do you want to add?",
        name: "name",
      },
    ])
    .then(({ name }) => {
      connection.query("INSERT INTO department SET ?", { name }, (err) => {
        if (err) throw err;
        console.log(`Department added: ${name}`);
        init();
      });
    });
};
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What role would you like to add?",
        // choices: ["Manager", "Intern", "Lawyer", "Salesman",],
        name: "title",
      },
      {
        type: "input",
        message: "What is their salary?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department ID?",
        name: "department_id",
      },
    ])
    .then(({ title, salary, department_id }) => {
      connection.query(
        "INSERT INTO role SET ?",
        { title, salary, department_id },
        (err) => {
          if (err) throw err;
          console.log(`Role added: ${title}`);
          // department id use a join?
          init();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employees first name?",
        // choices: ["Manager", "Intern", "Lawyer", "Salesman",],
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employees last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the employees role ID?",
        name: "role_id",
      },
      {
        type: "input",
        message: "What is the employees manager ID?",
        name: "manager_id",
      },
    ])
    .then(({ first_name, last_name, role_id, manager_id }) => {
      connection.query(
        "INSERT INTO employee SET ?",
        { first_name, last_name, role_id, manager_id },
        (err) => {
          if (err) throw err;
          console.log(`Employee added: ${first_name} ${last_name}`);
          // role and manager id use joins?
          init();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee do you wante to update?",
        name: "update_employee",
      },
    ])
    .then(({ update_employee }) => {
      //select with update employee, how do we change? more prompts?
      connection.query("UPDATE employee SET ? WHERE ?", [{}], (err, res) => {
        if (err) throw err;
      });
    });
};
