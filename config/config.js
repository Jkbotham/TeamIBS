
module.exports = {

	"development": {
		"username": process.env.MYSQL_USER,
		"password": process.env.MYSQL_KEY,
		"database": process.env.MYSQL_DBNAME,
		"host": process.env.MYSQL_HOST,
		"dialect": "mysql",
		"operatorsAliases": false
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
	"facebook_api_key": "",
	"facebook_api_secret":"",
	"call_back_url": "https://teamibs.herokuapp.com/auth/facebook/callback",
	"use_database": true,
	"host": "localhost",
	"username": "root",
	"password": "",
	"database": "Database Name"
};