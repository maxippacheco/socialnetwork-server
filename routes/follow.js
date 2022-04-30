const { Router } = require('express');
const { check } = require('express-validator');
const { followUser, getFollowers, getFollowings, unfollowUser } = require('../controllers/follow');
const { isValidUserById } = require('../helpers/db-validations');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

// TODO: validations
router.put('/:id',[
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

router.put('/unfollow/:id',[
	check('id').isMongoId().withMessage('id must be a valid mongo id'),
	// check('id').custom( isValidUserById ).withMessage('id must be a valid user id'),
	check('id').notEmpty().withMessage('id must be a valid user id'),
	validateJWT,
	validateFields
], unfollowUser);


router.get('/following/:id',[
	check('id').isMongoId(),
	check('id').custom( isValidUserById ),
	check('id').notEmpty(),
	validateJWT,
	validateFields
], getFollowings);



module.exports = router;