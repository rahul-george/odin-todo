import { format } from "date-fns";

class TodoController {
    constructor(todoView, todoModel, mediator) {
        this.todoView = todoView;
        this.todoModel = todoModel;
        this.mediator = mediator;

        // If binding is not done, then instance attributes cannot be accessed when callback is called.
        this.mediator.subscribe(
            "project:select",
            this.viewTasksInProject.bind(this)
        );

        this.mediator.subscribe(
            "inbox:select",
            this.viewTasksInInbox.bind(this)
        );

        this.mediator.subscribe(
            "today:select",
            this.viewTasksDueToday.bind(this)
        );

        // register handlers
        this.todoView.registerOnDeleteHandler(this.deleteTask.bind(this));
        this.todoView.registerOnUpdateHandler(this.updateTask.bind(this));
    }

    viewTasksInProject(projectName) {
        // Update the Todo View
        const tasks = this.todoModel.readTaskByProjectName(projectName);
        this.todoView.render(tasks);
    }
    viewTasksInInbox() {
        this.viewTasksInProject("Inbox");
    }

    viewTasksDueToday() {
        const tasks = this.todoModel.readTaskByDueDate(
            format(new Date(), "yyyy-MM-dd")
        );
        this.todoView.render(tasks);
    }

    deleteTask(taskId) {
        this.todoModel.deleteTask(taskId);
        this.todoView.removeTaskCard(taskId);
    }

    updateTask(task) {
        this.todoModel.updateTask(task);
    }

    createTask() {}
}

export { TodoController };
