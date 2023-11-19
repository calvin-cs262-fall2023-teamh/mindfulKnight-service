//establish the connection

const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Configure the server and its routes.

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());


router.get('/', readHelloMessage);
router.get('/users', readUsers);
router.get('/fidget_toys', readFidgetToys);

app.use(router);
app.listen(port, () => console.log(`Listening on port ${port}`));


// create the crud functions

function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}


function readHelloMessage(req, res) {
  res.send('Welcome to the Mindful Knight webservice!');
}


function readUsers(req, res, next) {
  db.many('SELECT * FROM users') // Updated query to select from the "users" table
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}


function readFidgetToys(req, res, next) {
  db.many('SELECT * FROM fidget_toys')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}






