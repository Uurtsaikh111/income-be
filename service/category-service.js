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
    const Query = `INSERT INTO category (name, id, category_image) VALUES ('${newUser.name}','${newUser.id}','${newUser.icon}');`;
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

  async function getCategories() {
    const client = await pool.connect();
    let response;
    try {
      response = await client.query("SELECT * FROM category");
    } catch (error) {
      throw new Error(error ? error.message : "Error");
    } finally {
      client.release();
    }
    return response.rows;
  }

  async function deleteCategory(cat) {
    const client = await pool.connect();
    const Query = `DELETE FROM category WHERE name='${cat.name}'`;
    
    let response;
    try {
      response = await client.query(Query);
    } catch (e) {
    } finally {
      client.release();
    }
    return "deleted cat"
  }
  module.exports = {
    addCategories,
    getCategories,
    deleteCategory
  };
  

  