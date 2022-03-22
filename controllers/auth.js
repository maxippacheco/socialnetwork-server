const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/create-jwt');
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
		res.status(400).json({
			ok: false,
			msg: 'there was a problem'
		})
		console.log(error);
	}


}


const login = async(req, res) => {

	const { email, password1, password2 } = req.body;

	try {
		
		const userDB = await User.findOne({ email });

		if (!userDB) {
			return res.status(400).json({
				ok: false,
				msg: 'The email does not exist!'
			})
		}

		const is_validPassword = bcryptjs.compareSync( password1, userDB.password );

		if ( !is_validPassword && password1 !== password2 ) {
			return res.status(400).json({
				ok: false,
				msg: 'The password is not valid'
			})
		}

		const token = await generateJWT( userDB.id );

		res.json({
			ok: true,
			token,
			userDB
		})


	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: 'there was a problem'
		})
		console.log(error);		
	}
 

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
		res.status(400).json({
			ok: false,
			msg: 'there was a problem'
		})
		console.log(error);

	}


}


module.exports = {
	register,
	login,
	getUsers
}