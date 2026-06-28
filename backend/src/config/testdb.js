const pool = require("./db");

async function testDb() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows[0]);
  } catch (err) {
    console.error(err);
  }
}

testDb();