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

exports.getUser = async (req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users");
      console.log(result)
      res.status(200).send({ message: result.rows });
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }};
