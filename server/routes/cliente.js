const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.get('/total', clienteController.total);
router.post('/', clienteController.buscar);
router.get('/addcliente', clienteController.form);
router.post('/addcliente', clienteController.create);
router.get('/editcliente/:id', clienteController.edit);
router.post('/editcliente/:id', clienteController.atualizar);
router.get('/:id', clienteController.deletar);
router.get('/viewcliente/:id', clienteController.ver);


module.exports = router;