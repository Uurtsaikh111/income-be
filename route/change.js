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

exports.change = async (req, res) =>{
    const client = await pool.connect();

    try {
      const result = await client.query("DROP TABLE test;");
  
      // console.log(result.rows[0]);
    } finally {
      client.release();
    }
  };