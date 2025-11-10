import "./styles.css";
// import { TaskCard } from "./components/task-card";

// import { filterByToday, filterByProject } from "./filterMethods";

import {
  initializeApp,
  renderTasksByProject,
  renderTasksByDate,
} from "./commands";
import { format } from "date-fns";

// function editTask(event, task) {
//   const taskIndex = tasks.findIndex((taskItem) => task.id == taskItem.id);
//   tasks.splice(taskIndex, 1, task);
//   console.log(tasks);
//   renderTasks();
// }

// function deleteTask(event, task) {
//   const taskIndex = tasks.findIndex((taskItem) => task.id == taskItem.id);
//   tasks.splice(taskIndex, 1);
//   renderTasks();
// }

// function renderTasks() {
//   const taskList = document.querySelector("#tasks");
//   Array.from(taskList.children).forEach((task) => task.remove());

//   const filteredTasks = filters.reduce(
//     (filteredTasks, fn) => fn(filteredTasks),
//     tasks
//   );

//   filteredTasks.forEach((task) => {
//     taskList.append(new TaskCard(task, editTask, deleteTask).render());
//   });
// }

// const tasksTodayFilter = document.querySelector("#filter-tasks-today");
// tasksTodayFilter.addEventListener("click", (e) => {
//   filters.splice(0);
//   filters.push(filterByToday);
//   renderTasks();
// });

// const tasksInboxFilter = document.querySelector("#filter-tasks-inbox");
// tasksInboxFilter.addEventListener("click", (e) => {
//   filters.splice(0);
//   filters.push(filterByProject("Inbox"));
//   renderTasks();
// });

// renderTasks();
//

const inboxElement = document.querySelector("#filter-tasks-inbox");
inboxElement.addEventListener("click", () => {
  renderTasksByProject("#tasks", "Inbox");
});

const todayElement = document.querySelector("#filter-tasks-today");
todayElement.addEventListener("click", (e) => {
  renderTasksByDate("#tasks", format(new Date(), "yyyy-MM-dd"));
});
initializeApp("#tasks");
