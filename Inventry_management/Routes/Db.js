const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "swaas@123",
  database: "inventry_management",
});

connection.connect((err) => {
  if (err) {
    console.log("An error Occured", err);
    return;
  } else {
    console.log("Connected Successfully");
  }
});

module.exports = connection.promise();
