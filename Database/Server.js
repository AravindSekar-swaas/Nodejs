const mysql = require("mysql2");
const http = require("http");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "swaas@123",
  database: "cricket",
});
connection.connect((err) => {
  if (err) {
    console.log("An error Occured", err);
    return;
  } else {
    console.log("Connected Successfully");
  }
});

const server = http.createServer((req, res) => {
  
  res.setHeader("Content-Type", "application/json");
  connection.query("Select * from teams", (err, result, fields) => {
    if (err) {
      console.error("Error Found");
    } else {
      //   var html = "<h1>" + util.inspect(result) + ".</h1>";
        const data=JSON.stringify(result)
      res.end(data);
    }
  });
});
server.listen(5000, () => {
  console.log("server is running");
  
});
