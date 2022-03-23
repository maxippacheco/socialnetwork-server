const { Schema, model } = require('mongoose');


const PostSchema = new Schema({
	text:{
		type: String,
		required: [ true, 'You must put a text to create a post' ],
	},
	user_id:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
	retweet: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = model( 'Post', PostSchema );