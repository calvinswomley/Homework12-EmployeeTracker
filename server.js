const { response } = require('express');
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql');

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


//Initial prompt
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'mainmenu',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
    .then((answers) => {
        console.log(answers)
        if (answers.mainmenu === 'View All Employees') {
            console.log('1')
            db.query('SELECT * FROM employee', function (err, results) {
                console.log(results)
            });
        }
        if (answers.mainmenu === 'Add Employee') {
            console.log('2')
        }
        if (answers.mainmenu === 'Update Employee Role') {
            console.log('3')
        }
        if (answers.mainmenu === 'View All Roles') {
            console.log('4')
        }
        if (answers.mainmenu === 'Add Role') {
            console.log('5')
        }
        if (answers.mainmenu === 'View All Departments') {
            console.log('6')
        }
        if (answers.mainmenu === 'Add Department') {
            console.log('7')
        }
        if (answers.mainmenu === 'Quit') {
            console.log('8')
        }
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
  