const { Router } = require('express');
const { check } = require('express-validator');
const { register, getUsers, login, getUserByUsername, loginWithGoogle, renewToken, updateUser } = require('../controllers/auth');
const { isValidUserById } = require('../helpers/db-validations');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

// TODO: VALIDATION

const router = Router();

router.get('/', getUsers);

router.get('/:username',[ 
	check('username').not().isEmpty(),
	validateFields
],getUserByUsername );


router.post('/register',[
	check('name').not().isEmpty(),
	check('username').not().isEmpty(),
	check('email').isEmail(),
	check('password').isLength({ min: 6 }),
	validateFields
],register);

router.post('/login',[
	check('email').isEmail(),
	check('password1').isLength({ min: 6 }),
	check('password2').isLength({ min: 6 }),
	validateFields
],login);

router.post('/login/google' ,loginWithGoogle);
	
router.put('/renew', validateJWT ,renewToken);

router.put('/user/:id',[ 
	check('id').not().isEmpty(),
	validateJWT,
	validateFields

], updateUser );

module.exports = router;