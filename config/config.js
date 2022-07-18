require('dotenv').config();
const {
  PG_HOST,
  PG_USER,
  PG_PASS,
  PG_DB_NAME,
  PG_PORT
} = process.env;

module.exports = {
  "development": {
    "username": PG_USER,
    "password": PG_PASS,
    "database": PG_DB_NAME,
    "host": PG_HOST,
    "dialect": "mysql",
    "port": 8889,
    "logging": false,
    "define": {
      "timestamps": false
  }
  },
  "test": {
    "username": PG_USER,
    "password": PG_PASS,
    "database": PG_DB_NAME,
    "host": PG_HOST,
    "dialect": "postgres",
    "port": PG_PORT
  },
  "production": {
    "username": PG_USER,
    "password": PG_PASS,
    "database": PG_DB_NAME,
    "host": PG_HOST,
    "dialect": "postgres",
    "port": PG_PORT,
    "use_env_variable": 'DATABASE_URL',
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
}