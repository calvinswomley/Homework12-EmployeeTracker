const { response } = require('express');
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employeetracker_db'
    },
    console.log(`Connected to the employeetracker_db database.`)
  );
//Add department prompt
const departmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'New Department Name?',
            name: 'newDepartment',
        }
    ])
    .then((answers) => {
        newDepName = answers.newDepartment;
        console.log(newDepName);
        db.query(`INSERT INTO department (depname) VALUES (?);`, newDepName, function (err, results) {
            promptUser();
            console.log(results);
        })
    })
}

//Add role prompt
const rolePrompt = () => {
    var departmentList = [];
    db.query('SELECT * FROM department', async function (err, results) {
        for (const result of results) {
            departmentList.push(result.depname);
        }
    });
    return inquirer.prompt([
        {
            type: 'input',
            message: 'New Role Name?',
            name: 'newRole',
        },
        {
            type: 'input',
            message: 'New Role Salary?',
            name: 'newRoleSalary',
        },
        {
            type: 'list',
            message: 'Department?',
            name: 'roleDepartment',
            choices: departmentList,
        }
    ])
    .then((answers) => {
        var answerTitle = answers.newRole;
        var answerSalary = answers.newRoleSalary;
        var departmentId;
        db.query(`SELECT id FROM department WHERE depname = '${answers.roleDepartment}';`, function (err, results2) {
            console.log(answers.roleDepartment);
            departmentId = results2[0].id;
            console.log(departmentId);
        });
        db.query(`INSERT INTO employee_role (title, salary, department_id) VALUES ( ?, ?, ?);`, [answerTitle, answerSalary, departmentId], function (err, results) {
            promptUser();
            console.log(results);
        });
    });
}
//Add employee prompt
const employeePrompt = () => {
    var roleList = [];
    db.query('SELECT * FROM employee_role;', async function (err, results) {
        for (const result of results) {
            roleList.push(result.title);
        }
    });
    var employeeList = [];
    db.query('SELECT * FROM employee;', async function (err, results) {
        for (const result of results) {
            employeeList.push(result.last_name);
        }
    });
    
        return inquirer.prompt([
            {
                type: 'input',
                message: 'Employee First Name?',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'Employee Last Name?',
                name: 'last_name',
            },
            {
                type: 'list',
                message: 'Employee Role?',
                name: 'role',
                choices: roleList,
            },
            {
                type: 'list',
                message: 'Manager Last Name?',
                name: 'manager',
                choices: employeeList,
            }
        ])
        .then((answers) => {
            var answerFirst = answers.first_name;
            var answerLast = answers.last_name;
            var roleId;
            var managerId;
            db.query(`SELECT id FROM employee_role WHERE title = '${answers.role}';`, function (err, results2) {
                roleId = results2[0].id;
            });
            db.query(`SELECT id FROM employee WHERE last_name = '${answers.manager}';`, function (err, results3) {
                managerId = results3[0].id;
            });
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?);`, [answerFirst, answerLast, roleId, managerId], function (err, results) {
                promptUser();
                console.log(results);
            });
        })
}
//Update role
const updateRole = async () => {
    var roleList2 = [];
    db.query('SELECT * FROM employee_role', function (err, responses) {
        for (const response of responses) {
            roleList2.push(response.title);
        }
    });
    var employeeList2 = [];
    db.query('SELECT * FROM employee', async function (err, results) {
        for (const result of results) {
            employeeList2.push(result.last_name);
        }
    });
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Press enter to proceed.',
            name: 'confirm',
        },
        {
            type: 'list',
            message: 'Last Name of Employee for Role Update?',
            name: 'employeeUpdate',
            choices: employeeList2,
        },
        {
            type: 'list',
            message: 'New Employee Role?',
            name: 'roleNew',
            choices: roleList2,
        }
    ])
    .then((answers) => {
        var roleId2;
        var employeeId2;
        db.query(`SELECT id FROM employee_role WHERE title = '${answers.roleNew}';`, function (err, results2) {
            roleId2 = results2[0].id;
        });
        db.query(`SELECT id FROM employee WHERE last_name = '${answers.employeeUpdate}';`, function (err, results3) {
            employeeId2 = results3[0].id;
        });

        db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [roleId2, employeeId2], function (err, results) {
            promptUser();
            console.log(results);
        });

    });
}
//Initial prompt
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'mainmenu',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
        }
    ])
    .then((answers) => {
        const expr = answers.mainmenu;
        switch (expr) {
            case 'View All Employees':
                db.query('SELECT * FROM employee;', async function (err, results) {
                    console.log(results);
                    promptUser();
                });
                break;
            case 'Add Employee':
                employeePrompt();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                db.query('SELECT * FROM employee_role', async function (err, results) {
                    console.log(results);
                    promptUser();
                });
                break;
            case 'Add Role':
                rolePrompt();
                break;
            case 'View All Departments':
                db.query('SELECT * FROM department', async function (err, results) {
                    console.log(results);
                    promptUser();
                });
                break;
            case 'Add Department':
                departmentPrompt();
                break;
        };
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("There is an error.")
        } else {
            console.log("Something went wrong.")
        }
    });
}

promptUser();

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
  