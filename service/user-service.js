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
  if (response == null) {
    return "false";
  } else {
    return "true";
  }
}

async function updateUser(users) {
  const client = await pool.connect();
  const Query = `UPDATE users SET currency='${users.currency}' WHERE id='${users.id}'`;
  let response;
  try {
    response = await client.query(Query);
  } catch (e) {
  } finally {
    client.release();
    console.log("Currency added successfully");
  }

  return "True";
}

async function deleteUser(users) {
  const client = await pool.connect();
  const Query = `DELETE FROM users WHERE email='${users.email}'`;
  let response;
  try {
    response = await client.query(Query);
  } catch (e) {
  } finally {
    client.release();
  }
  return "deleted user"
}

async function login(user) {
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;
  let response;
  try {
    response = await client.query(Query);
    
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

async function createTable() {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query("CREATE TABLE test (name VARCHAR(50) NOT NULL, currency TEXT, email VARCHAR(50) NOT NULL UNIQUE, id VARCHAR(50) NOT NULL PRIMARY KEY,password VARCHAR(30) NOT NULL)"
    );
  } finally {
    client.release();
  }
}

async function dropTable() {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query( "DROP TABLE test;"
    );
  }  finally {
    client.release();
  }
}


module.exports = {
  getUsers,
  addUsers,
  login,
  updateUser,
  createTable,
  dropTable,
  deleteUser
};
