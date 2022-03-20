const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const register = async(req, res) => {
	
	try {
		
		const { username, email, password } = req.body;
		const user = new User({ username, email, password });
		
		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync(password, salt);
		
		await user.save();

		res.json({
			ok: true,
			user
		});
		
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'there was a problem'
		})
		console.log(error);
	}


}


const login = async(req, res) => {

	//TODO: verify email
	// TODO: compare password
	// TODO: create token
	// TODO: Trycatch 

}


const getUsers = async(req, res) => {

	
	try {
		const query = { status: true };
		
		const [ total, users ] = await Promise.all([
			User.countDocuments(),
			User.find(query)
		]);
	
		res.json({
			ok: true,
			total,
			users
		})

	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'there was a problem'
		})
		console.log(error);

	}


}


module.exports = {
	register,
	getUsers
}