const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
	name:{
		type: String,
		required: [ true, 'The username is required' ],
	},
	username:{
		type: String,
		required: [ true, 'The username is required' ],
		unique: true
	},
	email:{
		type: String,
		required: [ true, 'The email is required' ]
	},
	password:{
		type: String,
		required: [ true, 'The email is required' ]
	},
	online: {
		type: Boolean,
		default: false
	},
	status: {
		type: Boolean,
		default: true
	},
	img: { 
		type: String
	},
	followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	online:{
		type: Boolean,
		default: false
	}

});

UserSchema.methods.toJSON = function() {
	const { __v, status, _id, password, ...data } = this.toObject();

	data.id = _id;

	return data;
}

module.exports = model( 'User', UserSchema );