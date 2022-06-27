const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const mysql = require('mysql');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;



// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// Parse application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Template Engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


// Connection Pool
const pool = mysql.createPool({
    connectionLimiter: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID' + connection.threadid);
});


//Routes
const routes = require('./server/routes/cliente');
app.use('/', routes);
app.use('/buscar', routes);
app.use('/addcliente', routes);






//List server
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});