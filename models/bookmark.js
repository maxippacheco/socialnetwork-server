const { Schema, model } = require('mongoose');


const BookmarkSchema = new Schema({
	folder:{
		type: String,
		required: [true, 'Title is required']
	},
	userId:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'UserId is required']
	},
	posts:[{ type: Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: { createdAt: true, updatedAt: false } });


BookmarkSchema.methods.toJSON = function () {
	const { __v, _id , ...data } = this.toObject();
	data.id = _id;

	return data;

}

module.exports = model('Bookmark', BookmarkSchema);

