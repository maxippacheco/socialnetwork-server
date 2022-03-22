const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {
 
	try {
	
		const token = req.header('auth-token');

		if (!token) {
			return res.status(401).json({
				ok: false,
				msg: 'There is no token'
			});
		}

		const payload = jwt.verify( token, process.env.SECRET_KEY);

		req.uid = payload.uid;

		next();

	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'Token not valid'
		})
	}
	
};


module.exports = { validateJWT }