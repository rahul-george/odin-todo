import "./styles.css";
import { TaskCard } from "./components/task-card";
import { format, isMatch } from "date-fns";

function today() {
  const today = new Date();
  return format(today, "yyyy-MM-dd");
}

const tasks = [
  {
    id: 1,
    title: "Item 1",
    dueDate: today(),
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
    console.log(task);
    taskList.append(new TaskCard(task, editTask, deleteTask).render());
  });
}

function renderTasksForToday(e) {
  const taskList = document.querySelector("#tasks");
  Array.from(taskList.children).forEach((task) => task.remove());
  tasks.forEach((task) => {
    if (isMatch(task.dueDate, format(new Date(), "yyyy-MM-dd")))
      taskList.append(new TaskCard(task, editTask, deleteTask).render());
  });
}

function renderTasksForInbox(e) {
  const taskList = document.querySelector("#tasks");
  Array.from(taskList.children).forEach((task) => task.remove());
  tasks.forEach((task) => {
    if (isMatch(task.dueDate, ""))
      taskList.append(new TaskCard(task, editTask, deleteTask).render());
  });
}

const tasksTodayFilter = document.querySelector("#filter-tasks-today");
tasksTodayFilter.addEventListener("click", renderTasksForToday);

const tasksInboxFilter = document.querySelector("#filter-tasks-inbox");
tasksInboxFilter.addEventListener("click", renderTasksForInbox);

renderTasks();
