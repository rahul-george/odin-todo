class TodoModel {
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
            (task) => task.project === projectName
        );
        return filteredTasks;
    }

    readTaskByDueDate(dueDate) {
        const filteredTasks = this.tasks.filter(
            (task) => task.dueDate === dueDate
        );
        return filteredTasks;
    }
}

export { TodoModel };
