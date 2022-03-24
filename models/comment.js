const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
	text: {
		type: String,
		required: ['true', 'text is required'],
	},
	post_id: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: ['true', 'post_id is required'],
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: ['true', 'user_id is required'],
	},
}, { timestamps: { createdAt: true, updatedAt: false } });


CommentSchema.methods.toJSON = function () {
	const { __v, _id , ...data } = this.toObject();
	data.id = _id;

	return data;

}

module.exports = model('Comment', CommentSchema);