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

exports.deleteUser = async (req, res) => {
    const deleteUser = req.body;
    const client = await pool.connect();
    const Q = `DELETE FROM users WHERE email='${deleteUser.email}'`;
  
    try {
      client.query(Q);
    } catch (e) {
      console.log(e);
    } finally {
      client.release();
    }
    res.status(200).send({ message: "User Delete is successfully" });
  };

