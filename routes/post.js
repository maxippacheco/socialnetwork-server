const { Router } = require("express");
const { check } = require("express-validator");
const { 
	createPost, 
	likePost, 
	removeLike, 
	getPost, 
	commentPost, 
	retweetPost, 
	removeRetweet,
	getPosts
} = require("../controllers/post");
const { isValidPostById } = require("../helpers/db-validations");
const validateFields = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// TODO: validations 

router.post('/',[
	validateJWT,
	check('text', 'text is required').not().isEmpty(),
	check('text', 'text max length is 200').isLength({ max: 200 }),
	validateFields
],createPost);

router.put('/like/:id',[
	check('id', 'id is required').not().isEmpty(),
	check('id').isMongoId(),
	validateJWT,
	validateFields
], likePost);

router.put('/like/remove/:id',[
	check('id', 'id is required').not().isEmpty(),
	check('id').isMongoId(),
	validateJWT,
	validateFields
], removeLike);

router.post('/comment/:id',[
	check('id', 'id is required').not().isEmpty(),
	check('id').isMongoId(),
	validateJWT,
	validateFields
], commentPost);


router.get('/:id', [
	check('id', 'id is required').not().isEmpty(),
	check('id').isMongoId(),
	validateJWT,
	validateFields
], getPost);

router.get('/', [
	validateJWT,
	validateFields
], getPosts);



router.put('/retweet/:id', [
	check('id', 'id is required').not().isEmpty(),
	check('id').isMongoId(),

	validateJWT,
	validateFields
], retweetPost);

router.put('/retweet/remove/:id', [
	check('id', 'id is required').not().isEmpty(),
	check('id').isMongoId(),
	validateJWT,
	validateFields
], removeRetweet);


module.exports = router;