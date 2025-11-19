import { TaskCard } from "../components/task-card";
import { TodoCardInput } from "../components/todo-card-input/todo-card-input";

class TodoView {
    constructor() {
        this.taskContainer = document.querySelector("#tasks");
        this.onTaskUpdate = null;
        this.onTaskDelete = null;
        this.onTaskCreate = null;
    }

    clearTasks() {
        this.taskContainer.innerHTML = "";
    }

    render(tasks, { dueDate = null, activeProject = null }) {
        const taskInput = {};
        if (activeProject) {
            taskInput.project = activeProject;
        }
        if (dueDate) {
            taskInput.dueDate = dueDate;
        }
        this.clearTasks();
        const tasksFragment = document.createDocumentFragment();
        // Insert the create task card
        tasksFragment.appendChild(
            new TodoCardInput(taskInput, this.onTaskCreate).render()
        );
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

    registerOnCreateHandler(handler) {
        this.onTaskCreate = handler;
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
