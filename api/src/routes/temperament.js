const { Router } = require("express")
const {get_temperament} = require('../controllers/getTemperament')

const router = Router()


router.get('/', get_temperament)

module.exports = router