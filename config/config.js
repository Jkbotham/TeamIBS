
module.exports = {

  "development": {
    "username": process.env.MYSL_USER,
    "password": process.env.MYSL_KEY,
    "database": process.env.MYSL_DBNAME,
    "host": process.env.MYSL_HOST,
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSL_USER,
    "password": process.env.MYSL_KEY,
    "database": "database_test",
    "host": process.env.MYSL_HOST,
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variabel": "JAWSDB_URL",
    "dialect": "mysql"
  }
}