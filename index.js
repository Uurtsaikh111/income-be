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
//       "CREATE TABLE us (name VARCHAR(255), age INT, phone VARCHAR(255), email VARCHAR(255), id VARCHAR(255),password VARCHAR(255))"
//     );

//     // console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion();

// async function getPgVersion() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query("DROP TABLE us;");

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
  const Query = `INSERT INTO users (name, email, id, password) VALUES ('${newUser.name}','${newUser.email}','${newUser.id}','${newUser.password}');`;
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  res.status(200).send(true);
});

app.delete("/delete-user", async (req, res) => {
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
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
