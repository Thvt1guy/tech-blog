const express = require('express');
const path = require('path');
// const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const session = require('express-session');

const PORT = process.env.PORT || 3001;
const app = express();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 1000*60*60*30,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));


//Middleware to parse JSON
app.use(express.json());

//Middleware for parsing urlencoded form data
app.use(express.urlencoded({extended: true}));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Create static directory here!
app.use(express.static(path.join(__dirname, 'public')));

//Creating the parent route for home page api
// app.use('/home', routes);

app.use(require('./controllers/'));

app.listen(PORT, () => {
    console.log(`App Listening at PORT http://localhost:${PORT} !`);
    sequelize.sync({ force: false });
});