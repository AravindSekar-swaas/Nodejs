const mysql = require("mysql2");
const readlineSync = require("readline-sync");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "swaas@123",
  database: "todo",
});

connection.connect((err) => {
  if (err) {
    console.log("An error occurred", err);
  } else {
    console.log("Connected successfully");
  }
});

// let value = "true";

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

const viewTasks = async () => {
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

function deleteTask(taskId) {
  connection.query("DELETE FROM todo WHERE id = ?", [taskId], (err, res) => {
    if (err) {
      console.error("An error occurred while deleting the task", err);
    } else {
      console.log("Task deleted successfully");
    }
  });
}

async function main() {
  // while (true) {
  console.log("\nTo-Do App");
  console.log("1. Add new task");
  console.log("2. Mark task as completed");
  console.log("3. Update an existing task");
  console.log("4. Delete a task");
  console.log("5. View all tasks");
  console.log("6. Exit");

  const choice = readlineSync.question("Enter your choice: ");

  switch (choice) {
    case "1":
      const name = await readlineSync.question("Enter task name: ");
      await addTask(name);
      // value = "false";
      break;
    case "2":
      const completeTaskId = await readlineSync.questionInt(
        "Enter task ID to mark as completed: "
      );
      await markTaskCompleted(completeTaskId);
      break;
    case "3":
      const updateTaskId = await readlineSync.questionInt(
        "Enter task ID to update: "
      );
      const newName = await readlineSync.question("Enter new task name: ");
      await updateTask(updateTaskId, newName);
      break;

    case "4":
      const deleteTaskId = await readlineSync.questionInt(
        "Enter task ID to delete: "
      );
      await deleteTask(deleteTaskId);
      break;
    case "5":
      await viewTasks();
      // value = false;
      break;
    case "6":
      console.log("Exiting...");
      connection.end();
      return;
    default:
      console.log("Invalid choice. Please try again.");
  }
}
// }

main();
