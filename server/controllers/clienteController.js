const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimiter: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Listar todos os clientes na home
exports.listar = (req, res)=>{

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        //cliente the connection
        connection.query('select * from clientes', (err, rows)=>{
            connection.release();

            if(!err){
                res.render('home', { rows });
            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });
}

//Busca por nome na barra de pesquisa

exports.buscar = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        let seachTerm = req.body.buscar;

        //cliente the connection
        connection.query('select * from clientes where nome LIKE ? OR tipo_pagamento LIKE ?', ['%' + seachTerm + '%', '%' + seachTerm + '%'] , (err, rows)=>{
            connection.release();

            if(!err){
                res.render('home', { rows });
            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });

}

exports.form = (req, res)=>{
    res.render('add-cliente');
}