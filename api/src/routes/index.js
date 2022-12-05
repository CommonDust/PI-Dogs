const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const dogs = require('./dogs');
const temperament = require('./temperament');


router.use('/dogs', dogs)
router.use('/temperament', temperament)

module.exports = router;
