const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pgConif = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConif);

// async function getPgVersion() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query(
//       "CREATE TABLE users (name VARCHAR(255) NOT NULL, currency TEXT, email VARCHAR(255) NOT NULL, id VARCHAR(255),password VARCHAR(255) NOT NULL)"
//     );

//     // console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

//  getPgVersion();

// async function getPgVersion() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query("DROP TABLE users;");

//     // console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }



app.get("/users", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users");
    res.status(200).send({ message: result.rows });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.post("/add-user", async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const client = await pool.connect();
  const Query = `INSERT INTO users (name, email, id, password, currency) VALUES ('${newUser.name}','${newUser.email}','${newUser.id}','${newUser.password}','${newUser.currency}');`;
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  res.status(200).send(true);
});

app.post("/login", async (req, res) => {
  const user = req.body;
  console.log("fytfbtfb", user);
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;

  try {
    const response = client.query(Query);
    console.log("response", { response });
    if (response["rowCount"]) {
      return res.status(200).send({ success: "true" });
    } else {
      console.log(response);
      return res.status(500).send({ success: "false" });
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }
});

// app.delete("/delete-user", async (req, res) => {
//   const deleteUser = req.body;
//   const client = await pool.connect();
//   const Q = `DELETE FROM users WHERE email='${deleteUser.email}'`;

//   try {
//     client.query(Q);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
//   res.status(200).send({ message: "User Delete is successfully" });
// });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
