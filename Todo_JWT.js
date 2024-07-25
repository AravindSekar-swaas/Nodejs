const express = require("express");
const app = express();
const mysql=require('mysql2')
const dotenv=require("dotenv");
app.use(express.json())
const jwt=require('jsonwebtoken')
dotenv.config();
 
const posts = {
  username: "aravind",
  password: "aravind@123"
};
 
app.post("/login", (req, res) => {
    const { username, password } = req.body;
   
  if (username === posts.username && password === posts.password) {
    const token = jwt.sign({ user: username }, process.env.ACCESS_TOKEN, {
      expiresIn: '1h',
    });
    res.json({ token: token });
  }
});
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    
    
    if (!token) {
      return res.status(403).send("Token is required");
    }
    jwt.verify(token,process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(401).send("Invalid Token");
      }
      req.user = user;
      next();
    });
  }
 

 
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
  
  
  app.post("/addtodo", verifyToken, (req, result) => {
    let name = req.body.todo;
    const completed = false;
    connection.query(
      "INSERT INTO todo (todo, Completed) VALUES (?, ?)",
      [name, completed],
      (err, res) => {
        if (err) {
          console.error("An error occurred while inserting the task", err);
        } else {
          result.send("Success");
          console.log("Data inserted successfully");
        }
      }
    );
  });
  
 
  app.get("/viewtasks", verifyToken, (req, res) => {
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
  
 
  app.put("/markcompleted", verifyToken, (req, result) => {
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
          result.send("Marked as completed");
          console.log("Task marked as completed");
        }
      }
    );
  });
  
 
  app.delete("/deletetasks", verifyToken, (req, result) => {
    let task = req.body.id;
    connection.query("DELETE FROM todo WHERE id = ?", [task], (err, res) => {
      if (err) {
        console.error("An error occurred while deleting the task", err);
      } else {
        result.send("Deleted Successfully");
        console.log("Task deleted successfully");
      }
    });
  });
  
  
  app.listen(3000, (err) => {
    if (err) {
      console.log("Error in Running Server");
    } else {
      console.log(`Server is running on port 3000`);
    }
  });
 