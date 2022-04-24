const { Router } = require('express');
const { check } = require('express-validator');
const { followUser, getFollowers, getFollowings } = require('../controllers/follow');
const { isValidUserById } = require('../helpers/db-validations');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

// TODO: validations
router.post('/:id',[
	check('id').isMongoId(),
	check('id').notEmpty(),
	validateJWT,
	validateFields
],followUser);

router.get('/follower/:id',[
	check('id').isMongoId(),
	check('id').custom( isValidUserById ),
	check('id').notEmpty(),
	validateJWT,
	validateFields
], getFollowers);

router.get('/following/:id',[
	check('id').isMongoId(),
	check('id').custom( isValidUserById ),
	check('id').notEmpty(),
	validateJWT,
	validateFields
], getFollowings);



module.exports = router;