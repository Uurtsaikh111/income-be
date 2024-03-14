const { response } = require("express");
const { Pool } = require("pg");

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

async function getUsers() {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query("SELECT * FROM users");
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return response.rows;
}

async function addUsers(newUser) {
  const client = await pool.connect();
  const Query = `INSERT INTO users (name, email, id, password, currency) VALUES ('${newUser.name}','${newUser.email}','${newUser.id}','${newUser.password}','${newUser.currency}');`;

  let response;

  try {
    response = await client.query(Query);
  } catch (e) {
  } finally {
    client.release();
  }
  if (response==null) {
    return "false";
  } else {
    return "true";
  }
}

async function login(user) {
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;
  let response;
  try {
    response = await client.query(Query);
    console.log(response);
  } catch (e) {
  } finally {
    client.release();
  }
  const userId = response.rows[0];

  if (response["rowCount"]) {
    return userId;
  } else {
    return "false";
  }
}

async function updateUser(user) {
  const client = await pool.connect();
  const Query = `UPDATE users SET currency='${user.currency}' WHERE id='${user.id}'`;
  let response;
  try {
    response = client.query(Query);
  } catch (e) {
  } finally {
    client.release();
    console.log("Currency added successfully");
  }

  return response.rows;
}

module.exports = {
  getUsers,
  addUsers,
  login,
  updateUser,
};
