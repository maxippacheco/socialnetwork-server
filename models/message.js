const { Schema, model } = require('mongoose');


const MessageSchema = new Schema({
	from: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	to: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	message: {
		type: String,
		required: true
	}
}, { timestamps: true });

MessageSchema.method('toJSON', function(){

	const { __v, _id, ...data } = this.toObject();

	data.id = _id;

	return data;

}) 


module.exports = model('Message', MessageSchema);