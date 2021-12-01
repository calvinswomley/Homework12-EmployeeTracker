INSERT INTO department (depname)
VALUES  ('Product Development'),
        ('Management'),
        ('Support'),
        ('Sales');
    
INSERT INTO employee_role (title, salary, department_id)
VALUES  ('Product Engineer', 100000, 1),
        ('Sales Manager', 150000, 4),
        ('Project Manager', 125000, 2),
        ('Support Analyst', 60000, 3),
        ('CEO', 200000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Calvin', 'Swomley', 1, 5),
        ('Hannah', 'Montanna', 2, 5),
        ('Joe', 'Biden', 3, 5),
        ('Billy', 'Eilesh', 4, 5),
        ('Jake', 'Peralta', 5, null);
