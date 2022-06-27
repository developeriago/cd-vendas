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
        connection.query('select * from clientes where status = "ativo"', (err, rows)=>{
            connection.release();

            if(!err){
                let removecliente = req.query.removed;
                res.render('home', { rows, removecliente });
            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });
}


//Listar todos os clientes na home
exports.total = (req, res)=>{
    
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        //cliente the connection
        connection.query('select sum(total_compra) as total from clientes where status = "ativo"', (err, rows)=>{
            connection.release();

            if(!err){
                let removecliente = req.query.removed;
                res.render('total', { rows, removecliente });
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

exports.create = (req, res)=>{
    const {nome, telefone, data_compra, total_compra, tipo_pagamento, primeira_parcela, segunda_parcela, terceira_parcela, quarta_parcela, quinta_parcela, observacao} = req.body;

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        //let seachTerm = req.body.buscar;

        //cliente the connection
        connection.query('INSERT INTO clientes SET nome = ?, telefone = ?, data_compra = ?, total_compra = ?, tipo_pagamento = ?, primeira_parcela = ?, segunda_parcela = ?, terceira_parcela = ?, quarta_parcela = ?, quinta_parcela = ?, observacao = ? ', 
            [nome, telefone, data_compra, total_compra, tipo_pagamento, primeira_parcela, segunda_parcela, terceira_parcela, quarta_parcela, quinta_parcela, observacao], (err, rows)=>{
            connection.release();

            if(!err){
                res.render('add-cliente', { alert: 'Cliente adicionado!' });
            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });
}

//Visualizar Cliente
exports.edit = (req, res)=>{

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        //cliente the connection
        connection.query('select * from clientes where id = ?', [req.params.id] , (err, rows)=>{
            connection.release();

            if(!err){
                res.render('edit-cliente', { rows });
            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });
}

//Atualizar Cliente
exports.atualizar = (req, res)=>{
    const {nome, telefone, data_compra, total_compra, tipo_pagamento, observacao} = req.body;

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        //cliente the connection
        connection.query('UPDATE clientes SET nome = ?, telefone = ?, data_compra = ?, total_compra = ?, tipo_pagamento = ?, observacao = ? where id = ?', 
            [nome, telefone, data_compra, total_compra, tipo_pagamento, observacao, req.params.id] , (err, rows)=>{
            connection.release();

            if(!err){
                pool.getConnection((err, connection)=>{
                    if(err) throw err;
                    console.log('Connected as ID' + connection.threadid);
            
                    //cliente the connection
                    connection.query('select * from clientes where id = ?', [req.params.id] , (err, rows)=>{
                        connection.release();
            
                        if(!err){
                            res.render('edit-cliente', { rows, alert: `O cliente ${nome} foi alterado com sucesso! ` });
                        }else{
                            console.log(err);
                        }
            
                        console.log('The data from cliente table: \n', rows);
                    });
                });


            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });
}

//Deletar cliente
exports.deletar = (req, res)=>{

    //Deleta o usuario permanente
    //pool.getConnection((err, connection)=>{
        //if(err) throw err;
        //console.log('Connected as ID' + connection.threadid);

        //cliente the connection
        //connection.query('DELETE from clientes where id = ?', [req.params.id] , (err, rows)=>{
            //connection.release();

           // if(!err){
               // res.redirect('/');
            //}else{
                //console.log(err);
            //}

            //console.log('The data from cliente table: \n', rows);
        //});
   // });

    //Inativar o usuario
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        //cliente the connection
        connection.query('UPDATE clientes SET status = ? where id = ?', ['inativo', req.params.id] , (err, rows)=>{
            connection.release();

            if(!err){
                let removecliente = encodeURIComponent('Cliente removido! ');
                res.redirect('/?removed=' + removecliente);
            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });
}

//Ver cadastro
exports.ver = (req, res)=>{

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadid);

        //cliente the connection
        connection.query('select * from clientes where id = ?', [req.params.id], (err, rows)=>{
            connection.release();

            if(!err){
                res.render('view-cliente', { rows });
            }else{
                console.log(err);
            }

            console.log('The data from cliente table: \n', rows);
        });
    });
}