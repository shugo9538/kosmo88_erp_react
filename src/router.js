const express = require("express"),
  dbConfig = require("./dbConfig"),
  db = require("oracledb"),
  router = express.Router();

router.get("/", function (req, res) {
  let arrStr;
  db.getConnection(
    {
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    },
    function (err, conn) {
      if (err) {
        console.log("접속 실패", err);
        return;
      }
      console.log("접속 성공");

      conn.execute(
        "select * from employee",
        {},
        { outFormat: db.OUT_FORMAT_OBJECT },
        function (err, result) {
          if (err) throw err;

          console.log("query read success");

          var dataStr = JSON.stringify(result);
          arrStr = JSON.stringify(result.rows);
          var arr = JSON.parse(arrStr);
          res.send(arr);
        }
      );
    }
  );
});

module.exports = router;
