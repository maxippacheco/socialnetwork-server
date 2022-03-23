const { Router } = require('express');
const { check } = require('express-validator');
const { followUser, getFollowers, getFollowings } = require('../controllers/follow');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

// TODO: validations
router.post('/:id',[
	validateJWT,
	check('id').isMongoId(),
	validateFields
],followUser);

router.get('/follower/:id',[
	validateJWT,
	check('id').isMongoId(),
	validateFields
], getFollowers);

router.get('/following/:id',[
	validateJWT,
	check('id').isMongoId(),
	validateFields
], getFollowings);




module.exports = router;