const { Router } = require('express');
const router = Router();
const usuariosController = require("../controllers/usuarios.controllers")

router.get('/getUsuarios',usuariosController.getUsuarios);

router.post('/registro',usuariosController.registro);

router.get('/login',usuariosController.login);

module.exports = router;