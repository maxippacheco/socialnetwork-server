const { Router } = require("express");
const { check } = require("express-validator");
const { deleteImageCloudinary } = require("../controllers/uploads");
const validateFields = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// TODO: fix this
router.delete('/:colection/:id',[
	validateJWT,
	validateFields
], deleteImageCloudinary);

module.exports = router;