const { default: mongoose } = require("mongoose");



const dbConnection = async () => {
	await mongoose.connect(process.env.DB_CONNECTION, {}, () =>{
		console.log('Database connected');
	})
};

module.exports = {
	dbConnection
}