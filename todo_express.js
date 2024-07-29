const mysql = require("mysql2");
const express = require("express");
const app = express();
app.use(express.json());


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "swaas@123",
  database: "todo",
});
connection.connect((err) => {
  if (err) {
    console.log("An error Occured", err);
    return;
  } else {
    console.log("Connected Successfully");
  }
});

app.post("/addtodo", (req, result) => {
  let name = req.body.todo;
  const completed = false;
  connection.query(
    "INSERT INTO todo (todo, Completed) VALUES (?, ?)",
    [name, completed],
    (err, res) => {
      if (err) {
        console.error("An error occurred while inserting the task", err);
      } else {
        result.send("success");
        console.log("Data inserted successfully");
      }
    }
  );
});

app.get("/viewtasks", (req, res) => {
  connection.query("SELECT * FROM todo", (err, result, fields) => {
    if (err) {
      console.error("Error found", err);
    } else {
      res.send(result);
      result.forEach((task) => {
        console.log(
          `ID: ${task.id}, Task: ${task.todo}, Completed: ${task.Completed}`
        );
      });
    }
  });
});

app.put("/markcompleted", (req, result) => {
  let taskId = req.body.id;
  connection.query(
    "UPDATE todo SET Completed = true WHERE id = ?",
    [taskId],
    (err, res) => {
      if (err) {
        console.error(
          "An error occurred while marking the task as completed",
          err
        );
      } else {
          result.send("Marked as completed")
        console.log("Task marked as completed");
      }
    }
  );
});

app.delete("/deletetasks", (req, result) => {
    let task = req.body.id;
    connection.query("DELETE FROM todo WHERE id = ?", [task], (err, res) => {
      if (err) {
        console.error("An error occurred while deleting the task", err);
      } else {
          
          result.send("Deleted Successfully")
        console.log("Task deleted successfully");
      }
    });
});
app.listen(3000, (err) => {
  if (err) {
    console.log("Error in Running Server");
  } else {
    console.log(`Server is running in port localhost:3000`);
  }
});
