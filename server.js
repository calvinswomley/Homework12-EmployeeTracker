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
