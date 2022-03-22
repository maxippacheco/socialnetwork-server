const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

	return new Promise( (resolve, reject) => {

		const payload = { uid };

		jwt.sign( payload, process.env.SECRET_KEY, {
			expiresIn: '24h'
			
		}, ( error, token ) => {
		  
			if (error) {
				console.log(error);
				reject('The token could not be generated');
			}else{
				resolve(token)
			}

		});
	
	});

};

module.exports = generateJWT;