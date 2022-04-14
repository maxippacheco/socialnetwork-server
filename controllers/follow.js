const User = require("../models/user")

// TODO: LAZY LOAD FRONTEND

const followUser = async(req, res) => {

	// userInSession
	const user_inSession = await User.findById(req.uid);

	const user_toFollow = await User.findById(req.params.id);

	// You can not follow you.
	if( req.uid === req.params.id ){
		return res.status(400).json({
			ok: false,
			msg: 'You can not follow you lmao'
		})
	}
	
	// Validate if the user follow the user already
	if( user_toFollow.followers.includes( user_inSession.id  ) ){
		return res.status(400).json({
			ok: false,
			msg: 'You already follow this user'
		})
	}
	
	// put only the id and the username
	user_inSession.following.push(user_toFollow.id);
	user_toFollow.followers.push(user_inSession.id);


	await user_inSession.save(),
	await user_toFollow.save(),
	

	res.json({
		ok: true,
		user_inSession,
		user_toFollow
	})
}

// TODO: UNFOLLOW USER

const getFollowers = async(req, res) => {

	const { id } = req.params;

	// Populate => pass the field in the schema and itself search for the
	const user = await User.findById( id )
								  .populate('followers');

	res.json({
		ok: true,
		total: user.followers.length,
		followers: user.followers
	});


}


const getFollowings = async( req, res ) => {
	const { id } = req.params;

	// Populate => pass the field in the schema and itself search for the
	const user = await User.findById( id )
								  .populate('following');

	res.json({
		ok: true,
		total: user.following.length,
		followers: user.following
	});

} 


module.exports = {
	followUser,
	getFollowers,
	getFollowings
}
