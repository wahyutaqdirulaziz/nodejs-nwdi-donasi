
PG_HOST="localhost"
PG_PORT=8889
PG_USER="root"
PG_PASS="root"
PG_DB_NAME="donasi_nwdi1"

module.exports = {
  "development": {
    "username": PG_USER,
    "password": PG_PASS,
    "database": PG_DB_NAME,
    "host": PG_HOST,
    "dialect": "mysql",
    "port": PG_PORT,
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