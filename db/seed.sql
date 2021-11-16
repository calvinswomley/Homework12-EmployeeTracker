INSERT INTO department (id, depname)
VALUES  (001, 'Product Development'),
        (002, 'Management'),
        (003, 'Support'),
        (004, 'Sales');

    
INSERT INTO employee_role (id, title, salary, department_id)
VALUES  (101, 'Product Engineer', 100000, 001),
        (102, 'Sales Manager', 150000, 004),
        (103, 'Project Manager', 125000, 001),
        (104, 'Support Analyst', 60000, 003),
        (105, 'CEO', 200000, 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (201, 'Calvin', 'Swomley', 101, 205),
        (202, 'Hannah', 'Montanna', 102, 205),
        (203, 'Joe', 'Biden', 103, 205),
        (204, 'Billy', 'Eilesh', 104, 205),
        (205, 'Jake', 'Peralta', 105, null);
