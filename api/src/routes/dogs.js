const { get_Dogs, get_Dogs_By_params } = require('../controllers/getDogControllers')
const {post_dogs} = require('../controllers/postDogControllers')
const { Router } = require('express')


const router = Router()




router.get('/' ,get_Dogs)
router.get('/:idRaza', get_Dogs_By_params )
router.post('/', post_dogs)


module.exports = router


