const { Schema, model } = require('mongoose');


const PostSchema = new Schema({
	text:{
		type: String,
		required: [ true, 'You must put a text to create a post' ],
	},
	user_id:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	img: { 
		type: String
	},
	status: {
		type: Boolean,
		default: true,
		required: true
	},
	likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
	retweet: [{type: Schema.Types.ObjectId, ref: 'User'}],
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],

}, { timestamps: { createdAt: true, updatedAt: false } });

PostSchema.methods.toJSON = function() {
	const { __v, _id, ...data } = this.toObject();
	
	data.id = _id;
	
	return data;
}

module.exports = model( 'Post', PostSchema );