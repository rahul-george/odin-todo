class FileStorage {
  constructor(key) {
    this.key = key;
  }

  load() {
    if (localStorage.getItem(this.key) !== null) {
      return JSON.parse(localStorage.getItem(this.key));
    }
    return [];
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

class TaskStore {
  constructor(dataStore) {
    this.taskStore = dataStore;
    this.tasks = this.taskStore.load();
  }

  save() {
    this.taskStore.save(this.tasks);
  }

  findTaskIndex(taskId) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error(`Could not find the task with id ${task.id}`);
    }
    return taskIndex;
  }

  createTask(task) {
    this.tasks.push(task);
    this.save();
  }

  updateTask(task) {
    const taskIndex = this.findTaskIndex(task.id);
    this.tasks.splice(taskIndex, 1, task);
    this.save();
  }

  deleteTask(taskId) {
    const taskIndex = this.findTaskIndex(taskId);
    this.tasks.splice(taskIndex, 1);
    this.save();
  }

  readAllTasks() {
    return this.tasks;
  }

  readTaskById(taskId) {
    const filteredTasks = this.tasks.filter((task) => task.id === taskId);
    return filteredTasks.length === 0 ? null : filteredTasks[0];
  }

  readTaskByProjectName(projectName) {
    const filteredTasks = this.tasks.filter(
      (task) => task.project === projectName,
    );
    return filteredTasks;
  }

  readTaskByDueDate(dueDate) {
    const filteredTasks = this.tasks.filter((task) => task.dueDate === dueDate);
    return filteredTasks;
  }
}

class ProjectStore {
  constructor(dataStore) {
    this.projectStore = dataStore;
    this.projects = this.projectStore.load();
  }

  save() {
    this.projectStore.save(this.projects);
  }

  createProject(project) {
    throw new Error("Not Implemented");
  }

  updateProject(project) {
    throw new Error("Not Implemented");
  }

  deleteProject(project) {
    throw new Error("Not Implemented");
  }

  readAllProjects() {
    return this.projects;
  }
}

export { TaskStore, ProjectStore, FileStorage };
