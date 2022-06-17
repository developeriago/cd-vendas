const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', clienteController.buscar);
router.get('/addcliente', clienteController.form);

module.exports = router;