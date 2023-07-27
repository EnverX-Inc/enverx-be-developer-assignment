const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: 'localhost',
    port: 3306, 
	dialect: 'mysql',
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		// Sync the model with the database (create the table if it doesn't exist yet)
		await sequelize.sync({ force: true });
		console.log("User table has been created (if it didn't exist).");
	} catch (error) {
		console.error('Unable to connect to the database:', error);
        process.exit(1);
	}
})();

module.exports = sequelize;
