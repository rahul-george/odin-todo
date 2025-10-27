import "./styles.css";
import { TaskCard } from "./components/task-card";

const tasks = [
  {
    id: 1,
    title: "Item 1",
    dueDate: "",
    isCompleted: true,
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
  renderTasks();
}

function deleteTask(event, task) {
  const taskIndex = tasks.findIndex((taskItem) => task.id == taskItem.id);
  tasks.splice(taskIndex, 1);
  renderTasks();
}

function renderTasks() {
  const taskList = document.querySelector("#tasks");
  Array.from(taskList.children).forEach((task) => task.remove());
  tasks.forEach((task) => {
    taskList.append(new TaskCard(task, editTask, deleteTask).render());
  });
}

renderTasks();
