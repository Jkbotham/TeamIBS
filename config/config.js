
module.exports = {

	"development": {
		"username": process.env.MYSQL_USER,
		"password": process.env.MYSQL_KEY,
		"database": process.env.MYSQL_DBNAME,
		"host": process.env.MYSQL_HOST,
		"port": 3306,
		"dialect": "mysql"
	},
	"test": {
		"username": process.env.MYSQL_USER,
		"password": process.env.MYSQL_KEY,
		"database": "database_test",
		"host": process.env.MYSQL_HOST,
		"port": 3306,
		"dialect": "mysql"
	},
	"production": {
		"use_env_variable": "JAWSDB_URL",
		"dialect": "mysql"
	},
	"facebook_api_key": "878033375944351",
	"facebook_api_secret":"07bedf82212416f6021d618f35862cc1",
	"call_back_url": "http://teamibs.herokuapp.com/auth/facebook/callback",
	"use_database": true,
	"host": "localhost",
	"username": "root",
	"password": "",
	"database": "Database Name"
};