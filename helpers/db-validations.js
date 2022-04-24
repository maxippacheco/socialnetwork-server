const Post = require("../models/post");
const User = require("../models/user")

const isValidUserById = ( id = '' ) => {

	const is_Valid = User.findById( id );

	if( !is_Valid ){
		throw new Error('User not found');
	}

}

const isValidPostById = ( id = '' ) => {

	const is_Valid = Post.findById( id );

	if( !is_Valid ){
		throw new Error('User not found');
	}

}


module.exports = {
	isValidUserById,
	isValidPostById
}