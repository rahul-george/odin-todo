import "./styles.css";
import { TaskCard } from "./components/task-card";

const tasks = [
  {
    id: 1,
    title: "Item 1",
    dueDate: "",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Item 2",
    dueDate: "",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Item 3",
    dueDate: "",
    isCompleted: false,
  },
];

function editTask(event, task) {
  const taskIndex = tasks.findIndex((taskItem) => task.id == taskItem.id);
  tasks.splice(taskIndex, 1, task);
}

function deleteTask(event, task) {
  alert("Delete task clicked");
}

tasks.forEach((task) => {
  const taskList = document.querySelector("#tasks");
  taskList.append(new TaskCard(task, editTask, deleteTask).render());
});
