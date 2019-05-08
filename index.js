// implement your API here
const express = require('express');

const server = express();
server.use(express.json());
const db = require('./data/db');

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.post('/api/users', (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(addUser => {
      res.status(201).send(addUser);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});


server.listen(9090, () => {
  console.log('server running on port 9090');
});
