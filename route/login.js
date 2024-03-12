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

exports.login = async (req, res) => {
  
  const user = req.body;
  console.log("user", user);
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;

  try {
    const response = await client.query(Query);
    console.log("response", { response });
    if (response["rowCount"]) {
      console.log(response["rowCount"]);
      return res.status(200).send({ success: "true" });
    } else {
      console.log(response["rowCount"]);
      return res.status(500).send({ success: "false" });
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }

};