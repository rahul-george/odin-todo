import "./styles.css";
// import { TaskCard } from "./components/task-card";

// import { filterByToday, filterByProject } from "./filterMethods";

import { Mediator } from "./services/mediator";

import { ProjectModel } from "./models/project.model";
import { TodoModel } from "./models/todo.model";

import { ProjectView } from "./views/project.view";
import { TodoView } from "./views/todo.view";
import { QuickFilterView } from "./views/quickfilter.view";

import { ProjectController } from "./controllers/project.controller";
import { TodoController } from "./controllers/todo.controller";
import { QuickFilterController } from "./controllers/quickfilter.controller";

import {
    initializeApp,
    renderTasksByProject,
    renderTasksByDate,
} from "./commands";
import { format } from "date-fns";
import { FileStorage } from "./storage";

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

// const inboxElement = document.querySelector("#filter-tasks-inbox");
// inboxElement.addEventListener("click", () => {
//     renderTasksByProject("#tasks", "Inbox");
// });

// const todayElement = document.querySelector("#filter-tasks-today");
// todayElement.addEventListener("click", (e) => {
//     renderTasksByDate("#tasks", format(new Date(), "yyyy-MM-dd"));
// });

/*
const createProjectButton = document.querySelector(".createProjectButton");
const createProjectInput = document.querySelector("#projectCreateContainer");
const closeProjectInput = document.querySelector("#closeProjectInput");
const projectNameInput = document.querySelector("#projectNameInput");
createProjectButton.addEventListener("click", (e) => {
    createProjectInput.classList.remove("hidden");
    createProjectButton.classList.add("hidden");
});

closeProjectInput.addEventListener("click", (e) => {
    projectNameInput.value = "";
    createProjectInput.classList.add("hidden");
    createProjectButton.classList.remove("hidden");
});

projectNameInput.addEventListener("keydown", (e) => {
    if (e.target.value === "") return;
    if (e.key.toLowerCase() === "enter") {
        console.log(e.target.value);
        //fixme: Handle it
        closeProjectInput.click();
    }
});

initializeApp("#tasks");

*/

class App {
    constructor() {
        this.mediator = new Mediator();
        this.quickFilterController = new QuickFilterController(
            new QuickFilterView(),
            this.mediator
        );
        this.projectController = new ProjectController(
            new ProjectView(),
            new ProjectModel(new FileStorage("projects")),
            this.mediator
        );

        this.todoController = new TodoController(
            new TodoView(),
            new TodoModel(new FileStorage("tasks")),
            this.mediator
        );
    }

    init() {
        this.projectController.viewProjects();
    }
}

const app = new App();
app.init();
