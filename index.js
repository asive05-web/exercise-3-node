

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

let managers = [
  { id: 1, name: 'Asive Simoki', Position: 'CEO' },
  { id: 2, name: 'Sinoyolo ngavu', Position: 'COO' },
];

let employees = [
  { id: 1, name: 'Njabulo Macuphe', Position: 'Personal assistant' },
  { id: 2, name: 'Buhle Phumezo', Position: 'Receptionist' },
];

app.get('/employees', (req, res) => {
  res.status(200).json(employees);
});

app.get('/managers', (req, res) => {
  res.status(200).json(managers);
});

app.post('/employees', (req, res) => {
  const { name, Position } = req.body;
  const newEmployee = { id: employees.length + 1, name, Position };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.post('/managers', (req, res) => {
  const { name, Position } = req.body;
  const newManager = { id: managers.length + 1, name, Position };
  managers.push(newManager);
  res.status(201).json(newManager);
});

app.patch('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, Position } = req.body;
  
  let employee = employees.find(emp => emp.id === parseInt(id));
  if (employee) {
    employee.name = name || employee.name;
    employee.Position = Position || employee.Position;
    res.status(200).json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

app.patch('/managers/:id', (req, res) => {
  const { id } = req.params;
  const { name, Position } = req.body;
  
  let manager = managers.find(mgr => mgr.id === parseInt(id));
  if (manager) {
    manager.name = name || manager.name;
    manager.Position = Position || manager.Position;
    res.status(200).json(manager);
  } else {
    res.status(404).send('Manager not found');
  }
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== parseInt(id));
  res.status(204).send();
});

app.delete('/managers/:id', (req, res) => {
  const { id } = req.params;
  managers = managers.filter(mgr => mgr.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


