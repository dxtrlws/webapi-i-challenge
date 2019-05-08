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
    .catch(({ code }) => {
      res
        .status(code)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide a name and bio for the user' });
  } else {
    const newUser = req.body;
    db.insert(newUser)
      .then(addUser => {
        res.status(201).send(addUser);
      })
      .catch(({ code }) => {
        res.status(code).json({
          error: 'There was an error while saving the user to the database'
        });
      });
  }
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

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db.update(id, user)
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.listen(9090, () => {
  console.log('server running on port 9090');
});
