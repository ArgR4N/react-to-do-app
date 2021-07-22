const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt')
const path = require('path')

require('dotenv').config()

const User = require('./api/models/User')

const port = process.env.PORT || 4000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/todo´s';

const app = express();

// conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
  .catch(err => console.error(`Connection error ${err}`));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(cookieParser('secret'));

app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
//Routes
app.use('/api', require('./api/routes/note'))
app.use('/api', require('./api/routes/todolist'))
//Passport
//Passport Routes
//Post to Register
app.post('/register', (req, res, next) =>{
  console.log(req.body)
  User.findOne({username: req.body.username}, (err, user) =>{
    if (err) throw err;
    if (user) res.send('User alredy exist!')
    if (!user){
      bcrypt.hash(req.body.password, 10)
        .then(result => {
          const newUser = new User({
            username:req.body.username,
            password: result
          })
          newUser.save()
          .then(res.send('User Created!'))
        })
    }
  })
})
//Post To Login
app.post('/login', (req, res, next) =>{
  passport.authenticate("local",(err, user, info) =>{
    if(err) throw err;
    if(!user) res.send('Username or Password are wrong!')
    else{
      req.logIn(user, err =>{
        if(err) throw err;
        res.send(req.user)
      })
    }
  })(req, res ,next)
})

// si el cliente NO hace una peticion a algun endpoint de la API
// entonces usamos una ruta que devuelva un status code 404
// 5to middleware (error 404 not found)
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
// no terminamos la cadena de middlewares ahi
// la pasamos a un 6to middleware que responda al cliente
// con el error 404 o 500 si vino de otro lado el problema



app.use((err, req, res, next) => {
  res.status(err.status || 500);
  // para mas detalles usar: console.error(err.stack)
  res.json({ error: err.message });
});



app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})  