const cloudinary = require('cloudinary');
const User = require('../models/user');

cloudinary.config( process.env.CLODINARY_URL );


const deleteImageCloudinary = async (req, res = response) => {
	const { id, colection } = req.params;

	const user = await User.findById( id );

	if( !user ){
		return res.status(404).json({
			ok: false,
			msg: 'User not found'
		}
	)}

	const img = user.img;

	if( !img ){

		return res.status(400).json({
			ok: false,
			msg: 'User does not have an image'
		})
	}

	await cloudinary.v2.uploader.destroy(img);

	user.img = null;
	await user.save();
	
	res.json({
		ok: true,
		msg: "Image deleted",
		user	
	});


};

module.exports = {
	deleteImageCloudinary
};
