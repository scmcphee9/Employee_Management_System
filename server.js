const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

//ascii art
const logo = require("asciiart-logo");
const config = require("./package.json");
console.log(
  logo({
    name: "Employee Manager",
    font: "ANSI Shadow",
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: "grey",
    logoColor: "bold-green",
  }).render()
);

// mysql connection and database connected to
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "skagwayak9",
  database: "employeeDB",
});

// mysql connection information
connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  init();
});

// starts the application
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
          return updateEmployeeRole();
        case "Quit":
          connection.end();
      }
    });
};

// views all departments
const viewDepartments = () => {
  // inquirer.prompt([{}])
  // console.log("Departments");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    console.table(res);
    init();
  });
};
// views all the roles
const viewRoles = () => {
  connection.query(
    "SELECT roles.id, roles.title, roles.salary, department.deptname  FROM roles LEFT JOIN department ON roles.department_id = department.id;",
    (err, res) => {
      if (err) throw err;

      console.table(res);
      init();
    }
  );
};
// views all the employees
const viewEmployees = () => {
  connection.query(
    "SELECT employee.id, employee.first_name,  employee.last_name, department.deptname, roles.title, roles.salary FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id",
    (err, res) => {
      if (err) throw err;

      console.table(res);
      init();
    }
  );
};
// adds a department
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
// adds a role
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
// adds employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employees first name?",
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
// updates an employee role(not currently working properly)
const updateEmployeeRole = () => {
  let roles;
  let names;

  connection.query(
    "SELECT employee.id, employee.first_name,  employee.last_name, roles.title, roles.id FROM employee LEFT JOIN roles ON employee.role_id = roles.id ",
    (err, data) => {
      names = [];
      roles = [];

      data.forEach((employee) => {
        names.push([employee.first_name, employee.last_name].join(" "));
      });

      data.forEach((role) => {
        roles.push(role.title);
      });

      // console.log(roles);
      // data.forEach((roleID) => {
      //   rolesID.push(roleID.id);
      // });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee role do you want to update?",
            choices: names,
            name: "employeeSelector",
          },
          {
            type: "list",
            message: "Which role do you want to change it to?",
            choices: roles,
            name: "roleSelector",
          },
        ])
        .then(({ employeeSelector, roleSelector }) => {
          // changes name to an array to use to select employee
          let empName = employeeSelector.split(" ");

          // let employeeIDSelector;

          // const employeeIdSelector = connection.query(
          //   "SELECT id FROM employee WHERE (employee.first_name = ? AND employee.last_name = ?) ",
          //   [empName[0], empName[1]],
          //   (err, res) => {
          //     if (err) throw err;

          //     console.log(res);
          //   }
          // );
          // console.log(employeeIDSelector);
          const rolesIdSelector = connection.query(
            "SELECT id FROM roles WHERE roles.title = ?",
            roleSelector,
            (err, res) => {
              if (err) throw err;

              console.log(res);
            }
          );

          // console.log(employeeIDSelector);
          // console.log(roleSelector);
          // const query = connection.query(
          //   "UPDATE employee SET role_id = ? WHERE id = ?",
          //   [roleSelector, employeeSelector],
          //   (err, res) => {
          //     if (err) throw err;
          //     console.log(`${res.affectedRows} employees updated \n`);
          //   }
          // );

          const query = connection.query(
            "UPDATE employee SET role_id = ? WHERE (first_name = ? AND last_name = ?)",
            [rolesIdSelector, empName[0], empName[1]],
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} employees updated \n`);
            }
          );
          console.table(query.sql);
          init();
        });
    }
  );

 
};
