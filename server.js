const inquirer = require('inquirer');



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
