const express = require("express"),
  dbConfig = require("./dbConfig"),
  db = require("oracledb"),
  router = express.Router();

db.autoCommit = true;
router.post("/insertHRGroupCode", run);

async function run(req, res) {
  console.log("post");
  let connection;
  try {
    connection = await db.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    });

    let query = "INSERT INTO HR_GROUP(id, name) VALUES(:id,:name)";
    let data = [Number(req.body.id), req.body.name];
    await connection.execute(query, data);

    connection.commit();
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = router;
