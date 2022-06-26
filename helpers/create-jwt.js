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

const checkJWT = ( token = '' ) => {

	try {
		
		const { uid } = jwt.verify( token, process.env.SECRET_KEY );

		return [ true, uid ]; 

	} catch (error) {
		return [ false ];
	}

}

module.exports = {
	generateJWT,
	checkJWT
};
// module.exports = checkJWT;