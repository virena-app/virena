//initializes a connection with our PostgresQL database
const connection = 'postgres://ysnirifw:HZzuHfAp7HvXM8qNRpm4G1LJJFHoK9JS@pellefant.db.elephantsql.com:5432/ysnirifw';
const pgp = require('pg-promise')(/*options*/);
const db = pgp(connection);

export default db;