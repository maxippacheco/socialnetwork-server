const { Router } = require('express');
const { followUser } = require('../controllers/follow');


const router = Router();

router.post('/follow/:id', followUser);


module.exports = router;