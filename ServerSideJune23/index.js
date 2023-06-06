const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')
const app = express();
const port = 3000

const req = require('express/lib/request');
const cookieParser = require('cookie-parser');

//middleware
const { flashMiddleware } = require('./lib/middleware.js');


//Routes
const home = require('./routes/home')
const trip = require('./routes/trip')



//this will allow for static files
app.use(express.static('public'));


// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'index' }); //Default page layout
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }))

const connectionString = 'mongodb://127.0.0.1:27017/SS2022'

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}).
catch(error => {
    console.log('Database connection refused' + error);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});

app.use(session({
    secret: "Davey",
    cookie: { maxage: 6000 },
    resave: false,
    saveUninitialized: false,
}))

app.use(cookieParser("Davey"));


app.use('/', home)
app.use('/book', trip)

// custom 404 page
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))