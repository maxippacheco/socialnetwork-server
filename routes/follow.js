const { Router } = require('express');
const { check } = require('express-validator');
const { followUser } = require('../controllers/follow');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.post('/:id',[
	validateJWT,
	check('id').isMongoId(),
	validateFields
],followUser);


module.exports = router;