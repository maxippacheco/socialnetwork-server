const User = require("../models/user")


const followUser = async(req, res) => {

	// userInSession
	const user_inSession = await User.findById(req.uid);

	const user_toFollow = await User.findById(req.params.id);
	
	// Validate if the user follow the user already
	if( req.uid === req.params.id ){
		return res.status(400).json({
			ok: false,
			msg: 'You can not follow you lmao'
		})
	}

	
	if(user_toFollow.followers?.includes(user_inSession?._id)){
		return res.status(400).json({
			ok: false,
			msg: 'You already follow this user'
		})
	}
	
	
	// TODO: put only the id and the username
	user_inSession.following.push(user_toFollow.id);
	user_toFollow.followers.push(user_inSession.id);

	await user_inSession.save();
	await user_toFollow.save();

	res.json({
		ok: true,
		user_inSession,
		user_toFollow
	})
}

const getFollowers = () => {

}


module.exports = {
	followUser
}