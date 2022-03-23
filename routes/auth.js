const { Router } = require('express');
const { register, getUsers, login } = require('../controllers/auth');

// TODO: VALIDATION

const router = Router();

router.get('/', getUsers);

router.post('/register', register);


router.post('/login', login);


// TODO: 
router.post('/login/google', (req, res) => {
	res.json({
		msg: 'Hola mundo'
	})
});




module.exports = router;