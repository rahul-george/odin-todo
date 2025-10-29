import "./styles.css";
import { TaskCard } from "./components/task-card";
import { format, isMatch } from "date-fns";
import { filterByToday, filterByInbox } from "./filterMethods";

function today() {
  const today = new Date();
  return format(today, "yyyy-MM-dd");
}

const filters = [];

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

  const filteredTasks = filters.reduce(
    (filteredTasks, fn) => fn(filteredTasks),
    tasks
  );

  filteredTasks.forEach((task) => {
    taskList.append(new TaskCard(task, editTask, deleteTask).render());
  });
}

const tasksTodayFilter = document.querySelector("#filter-tasks-today");
tasksTodayFilter.addEventListener("click", (e) => {
  filters.splice(0);
  filters.push(filterByToday);
  renderTasks();
});

const tasksInboxFilter = document.querySelector("#filter-tasks-inbox");
tasksInboxFilter.addEventListener("click", (e) => {
  filters.splice(0);
  filters.push(filterByInbox);
  renderTasks();
});

renderTasks();
