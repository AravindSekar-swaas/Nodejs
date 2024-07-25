const mysql = require("mysql2");
const http = require("http");
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
function addTask(name) {
  const completed = false;
  connection.query(
    "INSERT INTO todo (todo, Completed) VALUES (?, ?)",
    [name, completed],
    (err, res) => {
      if (err) {
        console.error("An error occurred while inserting the task", err);
      } else {
        
        console.log("Data inserted successfully");
      }
    }
  );
}
function updateTask(taskId, newName) {
  connection.query(
    "UPDATE todo SET todo = ? WHERE id = ?",
    [newName, taskId],
    (err, res) => {
      if (err) {
        console.error("An error occurred while updating the task", err);
      } else {
        console.log("Task updated successfully");
      }
    }
  );
}

const viewTasks = () => {
  connection.query("SELECT * FROM todo", (err, result, fields) => {
    if (err) {
      console.error("Error found", err);
    } else {
      console.log("Tasks:");
      result.forEach((task) => {
        console.log(
          `ID: ${task.id}, Task: ${task.todo}, Completed: ${task.Completed}`
        );
      });
      //  value="true"
    }
  });
};
function markTaskCompleted(taskId) {
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
        console.log("Task marked as completed");
      }
    }
  );
}
function deleteTask(taskId) {
  connection.query("DELETE FROM todo WHERE id = ?", [taskId], (err, res) => {
    if (err) {
      console.error("An error occurred while deleting the task", err);
    } else {
      console.log("Task deleted successfully");
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const method = req.method;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  console.log(body);
  req.on("end", () => {
    const data = body ? JSON.parse(body) : {};

    switch (true) {
      case path === "/addtasks" && method === "POST":
        addTask(data.todo);
        
      case path === "/viewtasks" && method === "GET":
        viewTasks();
      case path === "/markcompleted" && method === "PUT":
        markTaskCompleted(data.id);
      case path === "/updatetasks" && method === "PATCH":
        updateTask(data.id, data.newName);

      case path === "/deletetasks" && method === "DELETE":
        deleteTask(data.id);
    }
  });
  res.setHeader("Content-Type", "application/json");
  connection.query("Select * from todo", (err, result, fields) => {
    if (err) {
      console.error("Error Found");
    } else {
      //   var html = "<h1>" + util.inspect(result) + ".</h1>";
      const data = JSON.stringify(result);
      res.end(data);
    }
  });
});
server.listen(5050, () => {
  console.log("server is running");
});
