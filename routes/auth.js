const { Router } = require('express');
const { register, getUsers, login, getUserByUsername, loginWithGoogle, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

// TODO: VALIDATION

const router = Router();

router.get('/', getUsers);

router.get('/:username', getUserByUsername );

router.post('/register', register);

router.post('/login', login);

router.post('/login/google', loginWithGoogle);
	
router.put('/renew', validateJWT ,renewToken);

module.exports = router;