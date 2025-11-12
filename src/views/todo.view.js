import { TaskCard } from "../components/task-card";

class TodoView {
    constructor() {
        this.taskContainer = document.querySelector("#tasks");
        this.onTaskUpdate = null;
        this.onTaskDelete = null;
    }

    clearTasks() {
        this.taskContainer.innerHTML = "";
    }

    render(tasks) {
        this.clearTasks();
        const tasksFragment = document.createDocumentFragment();
        tasks.forEach((task) => {
            tasksFragment.appendChild(this.renderTask(task));
        });
        this.taskContainer.appendChild(tasksFragment);
    }

    renderTask(task) {
        return new TaskCard(
            task,
            this.onTaskUpdate,
            this.onTaskDelete
        ).render();
    }

    registerOnUpdateHandler(handler) {
        this.onTaskUpdate = handler;
    }

    registerOnDeleteHandler(handler) {
        this.onTaskDelete = handler;
    }

    removeTaskCard(taskId) {
        const taskCard = this.taskContainer.querySelector(
            `[data-task-id="${taskId}"]`
        );
        taskCard.remove();
    }
}

export { TodoView };
