const User = require('../models/user');
const Message = require('../models/message');

const userOnline = async( uid ) => {

	const user = await User.findById( uid );

	user.online = true;

	await user.save();

	return user;

}

const userOffline = async( uid ) => {

	const user = await User.findById( uid );

	user.online = false;

	await user.save();

	return user;

}


const createMessage = async( payload ) => {

	try {
		const message = new Message( payload );
	
		await message.save();
	
		return message;
		
	} catch (error) {
		console.log(error);	
	}

}

const getUsersOnline = async() => {

	const users = await User
		.find()
		.sort('-online');

	return users;
};

module.exports = {
	userOnline,
	userOffline,
	createMessage,
	getUsersOnline
}