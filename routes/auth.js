const { Router } = require('express');
const { register, getUsers } = require('../controllers/auth');


const router = Router();

router.get('/', getUsers);

router.post('/register', register);


router.post('/login', (req, res) => {
	res.json({
		msg: 'Hola mundo'
	})
})

router.post('/login/google', (req, res) => {
	res.json({
		msg: 'Hola mundo'
	})
})




module.exports = router;