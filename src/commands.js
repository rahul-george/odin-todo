import { TaskCard } from "./components/task-card";
import { ProjectCard } from "./components/project-card";
import { FileStorage, TaskStore, ProjectStore } from "./storage";
import { format } from "date-fns";

const taskStore = new TaskStore(new FileStorage("tasks"));
const projectStore = new ProjectStore(new FileStorage("projects"));

function today() {
  const today = new Date();
  return format(today, "yyyy-MM-dd");
}

// class TaskJSON {
//   constructor(tasks) {
//     this.tasks = tasks;
//   }
//   getById(id) {
//     return this.tasks.filter((task) => task.id === id);
//   }
//   getByDate(dueDate) {
//     return this.tasks.filter((task) => isMatch(task.dueDate, dueDate));
//   }
//   getByProject(project) {
//     return this.tasks.filter((task) => task.project === project);
//   }
// }

// class Tasks {
//   constructor(data_source) {
//     this.data_source = data_source;
//   }

//   getById(id) {
//     return this.data_source.getById(id);
//   }

//   getByDate(dueDate) {
//     return this.data_source.getByDate(dueDate);
//   }

//   getByProject(project) {
//     return this.data_source.getByProject(project);
//   }

//   create(task) {
//     return this.data_source.create(task);
//   }

//   update(task) {
//     return this.data_source.update(id, task);
//   }

//   delete(id) {
//     return this.data_source.delete(id);
//   }
// }
function renderProject(project) {
  return new ProjectCard(project, (projectName) => {
    renderTasksByProject("#tasks", projectName);
  }).render();
}

function renderProjects(projects) {
  return projects.map(renderProject);
}

function renderProjectsOnScreen(id, projects) {
  const projectContainer = document.querySelector(id);
  if (!projectContainer) {
    alert("Root element not found!");
  }

  Array.from(projectContainer.childNodes).forEach((projectItem) =>
    projectItem.remove(),
  );
  renderProjects(projects).forEach((projectCard) => {
    projectContainer.appendChild(projectCard);
  });
}

function createProject() {}

function renderTask(task) {
  // Convert a task object to a card.
  return new TaskCard(task, updateTask, deleteTask).render();
}

function renderTasks(tasks) {
  // Render all the tasks passed
  return tasks.map(renderTask);
}

function updateTask(task) {
  taskStore.updateTask(task);
}

function createTask(task) {
  // create task and update the UI
  taskStore.createTask(task);
}

function deleteTask(id) {
  // delete task by task id and update the UI.
  // delete the task_card from the dom, also delete from the storage.
  const taskElement = document.querySelector(`[data-task-id='${id}']`);
  if (!taskElement) {
    alert("Root element not found!");
  }
  taskElement.remove();
  taskStore.deleteTask(id);
}

function renderTasksByProject(id, projectName) {
  // fetch all tasks that belongs to the project and render them on the screen.
  const taskElement = document.querySelector(id);
  if (!taskElement) {
    alert("Root element not found!");
  }

  const taskCards = document.querySelectorAll("div.task");
  const allTasksFromProject = taskStore.readTaskByProjectName(projectName);
  Array.from(taskCards).forEach((taskCard) => taskCard.remove());
  renderTasks(allTasksFromProject).forEach((taskCard) =>
    taskElement.appendChild(taskCard),
  );
}

function renderTasksByDate(id, dueDate) {
  // fetch all tasks with given due date and render them on the screen.
  const taskElement = document.querySelector(id);
  if (!taskElement) {
    alert("Root element not found!");
  }
  const allTasksWithDueDate = taskStore.readTaskByDueDate(dueDate);
  Array.from(taskElement.childNodes).forEach((taskItem) => taskItem.remove());
  console.log(allTasksWithDueDate);
  renderTasks(allTasksWithDueDate).forEach((taskCard) =>
    taskElement.appendChild(taskCard),
  );
}

function renderTasksOnScreen(id, tasks) {
  const taskElement = document.querySelector(id);
  if (!taskElement) {
    alert("Root element not found!");
  }
  taskElement.childNodes.forEach((taskItem) => taskItem.remove());
  renderTasks(tasks).forEach((taskCard) => taskElement.appendChild(taskCard));
}

function initializeApp(id) {
  const tasks = [
    {
      id: 1,
      title: "Item 1",
      dueDate: today(),
      isCompleted: true,
      project: "Inbox",
    },
    {
      id: 2,
      title: "Item 2",
      dueDate: "",
      isCompleted: false,
      project: "Inbox",
    },
    {
      id: 3,
      title: "Item 3",
      dueDate: "",
      isCompleted: false,
      project: "Inbox",
    },
  ];

  if (taskStore.readAllTasks().length === 0) {
    createTask(tasks[0]);
    createTask(tasks[1]);
    createTask(tasks[2]);
  }
  const allTasks = taskStore.readAllTasks();
  renderTasksOnScreen(id, allTasks);

  const allProjects = projectStore.readAllProjects();
  console.log(allProjects);
  renderProjectsOnScreen("#projects", allProjects);
}

export { initializeApp, renderTasksByProject, renderTasksByDate };
