
const Message = require('../models/message');

const getChat = async(req, res) => {

	const myId = req.uid;
	const menssageFrom = req.params.from;

	const last30 = await Message.find({
		// condicion 
		$or: [
			{ from: myId, to: menssageFrom },
			{ from: menssageFrom, to: myId }
		]
	})
	.sort({ createdAt: 'asc' })
	.limit(30);


	res.json({
		ok:  true,
		messages: last30
	})

};




module.exports = {
	getChat 
}