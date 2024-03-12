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

exports.addUser = async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const client = await pool.connect();
  const Query = `INSERT INTO users (name, email, id, password, currency) VALUES ('${newUser.name}','${newUser.email}','${newUser.id}','${newUser.password}','${newUser.currency}');`;
  try {
    const response = await client.query(Query);
    //console.log("response", { response });
    if (response["rowCount"]) {
      //console.log(response["rowCount"]);
      return res.status(200).send({ success: "true" });
    } else {
      //console.log(response["rowCount"]);
      return res.status(500).send({ success: "false" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ success: "false" });
  } finally {
    client.release();
  }
};
