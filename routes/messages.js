const { Router } = require("express");
const { getChat } = require("../controllers/message");
const validateFields = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.get('/:from',[ 
	validateJWT, 
	validateFields

],getChat);


module.exports = router;