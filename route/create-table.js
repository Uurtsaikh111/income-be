const { Pool } = require("pg");

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
});

exports.getPgVersion = async (req, res) =>{
    const client = await pool.connect();
  
    try {
      const result = await client.query(
        "CREATE TABLE test (name VARCHAR(50) NOT NULL, currency TEXT, email VARCHAR(50) NOT NULL UNIQUE, id VARCHAR(50) NOT NULL PRIMARY KEY,password VARCHAR(30) NOT NULL)"
      );
  
      // console.log(result.rows[0]);
    } finally {
      client.release();
    }
  };