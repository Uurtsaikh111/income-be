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

async function addCategories(newUser) {
    const client = await pool.connect();
    console.log(newUser)
    const Query = `INSERT INTO category (name, description, id, createat, updatedat, category_image) VALUES ('${newUser.name}','${newUser.description}','${newUser.id}','${newUser.createdat}','${newUser.updatedat}','${newUser.category_image}');`;
    //CREATE TABLE Category (name VARCHAR(50) NOT NULL, id VARCHAR(50) NOT NULL PRIMARY KEY, description TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, category_image text )"
    let response;
  
    try {
      response = await client.query(Query);
      console.log(response)
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

  module.exports = {
    addCategories
  };
  

  