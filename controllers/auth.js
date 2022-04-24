const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/create-jwt');
const { googleVerify } = require('../helpers/google-verify');
const User = require('../models/user');

const register = async(req, res) => {
	
	try {
		
		const { username, name , email, password } = req.body;

		const isValid = await User.findOne({ email });

		if( !isValid ) {
			return res.status(400).json({
				ok: false,
				message: 'Email already exists'
			});
		}


		const user = new User({ username, name, email, password });
		
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

		const is_validPassword = await bcryptjs.compareSync( password1, userDB.password );

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

const loginWithGoogle = async(req, res) => {

	const { id_token } = req.body;

	try {
		
		const { email, name, img } = await googleVerify( id_token );

		let user = await User.findOne({ email })

		if ( !user ) {
			
			const data = {
				username: email.split("@")[0],
				name,
				email,
				img,
				password: ':)',
				google: true
			}

			user = await new User(data);

			await user.save();

		}


		const token = await generateJWT( user.id );

		res.json({
			ok : true,
			token,
			user
		})

	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: 'there was a problem'
		})
		console.log(error);		
	}


}

const renewToken = async(req, res) => {

	const uid = req.uid;

	// Gemerar un nuevo JWT
	const token = await generateJWT( uid );

	//USUARIO
	const user = await User.findById( uid );


	res.json({
		ok: true,
		user,
		token
	});
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

const getUserByUsername = async(req, res) => {
	try {
		
		const { username } = req.params;
		const query = { username };
		
		const user = await User.findOne(query);
		
		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'The user does not exist!'
			})
		}

		res.json({
			ok: true,
			user
		})


	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: 'there was a problem'
		})
		console.log(error);
	}
}

// TODO: CREATE HELPER TO VALIDATE IDS IN USER COLLECTION
const updateUser = async(req, res) => {

   const { id } = req.params;
   const { _id, password, ...rest } = req.body;

   if ( password ) {
     	// Encriptar la contraseña
   	const salt = bcryptjs.genSaltSync();
   	rest.password = bcryptjs.hashSync( password, salt );
   }

   const user = await User.findByIdAndUpdate( id, rest, { new: true } );

   res.json({
		ok: true,
		user
	});

}

module.exports = {
	register,
	login,
	loginWithGoogle,
	renewToken,
	getUsers,
	getUserByUsername,
	updateUser
}