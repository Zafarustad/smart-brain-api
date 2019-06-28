const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const cors = require('cors');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'db123',
      database : 'smart-brain'
    }
  });

const app = express();
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) =>{ signin.handleSignIn(req, res, bcrypt, knex) });

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt, saltRounds) });

app.get('/profile/:id', (req, res) =>{ profile.handleProfileGET(req, res, knex) });

app.put('/image', (req, res) => { image.handleImage(req, res, knex) });

//app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT}`)
});