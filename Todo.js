const fs = require("fs");
const readlineSync = require("readline-sync");

const tasksFilePath = "tasks.json";

function readTasks() {
  try {
      const tasksData = fs.readFileSync(tasksFilePath);
      
    return JSON.parse(tasksData);
  } catch (error) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

function addTask(
    name) {
  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1,
    name,
    completed: false,
    comments: [],
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Task added successfully.");
}

function markTaskCompleted(taskId) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = true;
    saveTasks(tasks);
    console.log("Task marked as completed.");
  } else {
    console.log("Task not found.");
  }
}

function updateTask(taskId, newName) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.name = newName;
    saveTasks(tasks);
    console.log("Task updated successfully.");
  } else {
    console.log("Task not found.");
  }
}

function addTaskComment(taskId, comment) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.comments.push(comment);
    saveTasks(tasks);
    console.log("Comment added successfully.");
  } else {
    console.log("Task not found.");
  }
}

function deleteTask(taskId) {
  let tasks = readTasks();
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks(tasks);
  console.log("Task deleted successfully.");
}

function viewTasks() {
  const tasks = readTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    tasks.forEach((task) => {
      console.log(
        `ID: ${task.id}, Name: ${task.name}, Completed: ${task.completed}`
      );
      if (task.comments.length > 0) {
        console.log("Comments:");
        task.comments.forEach((comment) => console.log(`- ${comment}`));
      }
    });
  }
}

async function main() {
  while (true) {
    console.log("\nTo-Do App");
    console.log("1. Add new task");
    console.log("2. Mark task as completed");
    console.log("3. Update an existing task");
    console.log("4. Add task comments");
    console.log("5. Delete a task");
    console.log("6. View all tasks");
    console.log("7. Exit");

    const choice = readlineSync.question("Enter your choice: ");

    switch (choice) {
      case "1":
        const name = await readlineSync.question("Enter task name: ");
        await addTask(name);
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
        const commentTaskId = await readlineSync.questionInt(
          "Enter task ID to add comments: "
        );
        const comment = await readlineSync.question("Enter comment: ");
        await addTaskComment(commentTaskId, comment);
        break;
      case "5":
        const deleteTaskId = await readlineSync.questionInt(
          "Enter task ID to delete: "
        );
        await deleteTask(deleteTaskId);
        break;
      case "6":
        await viewTasks();
        break;
      case "7":
        console.log("Exiting...");
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();

