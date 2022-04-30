const { Router } = require("express");
const { check } = require("express-validator");
const { getBookmarks, createBookmark, addPostToBookmark, removePostFromBookmark } = require("../controllers/bookmark");
const validateFields = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/', getBookmarks ); 

router.post('/',[
	check('folder').not().isEmpty().withMessage('Folder is required'),
	validateFields,
	validateJWT
],createBookmark ); 

router.put('/:id/:postId',[
	validateJWT,
	check('id').not().isEmpty().withMessage('Id is required'),
	check('id').isMongoId().withMessage('Id is not valid'),
	check('postId').not().isEmpty().withMessage('PostId is required'),
	validateFields,
], addPostToBookmark );

router.delete('/:id/:postId', [
	validateJWT,
	check('id').not().isEmpty().withMessage('Id is required'),
	check('id').isMongoId().withMessage('Id is not valid'),
	check('postId').not().isEmpty().withMessage('PostId is required'),
	validateFields,
], removePostFromBookmark );

module.exports = router;