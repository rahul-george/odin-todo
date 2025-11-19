import { format } from "date-fns";

class TodoController {
    constructor(todoView, todoModel, mediator, filterHelper) {
        this.todoView = todoView;
        this.todoModel = todoModel;
        this.mediator = mediator;
        this.filterHelper = filterHelper;

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
        this.todoView.registerOnCreateHandler(this.createTask.bind(this));
    }

    viewTasksInProject(projectName) {
        // Update the Todo View
        const tasks = this.todoModel.readTaskByProjectName(projectName);
        this.todoView.render(tasks, { activeProject: projectName });
    }
    viewTasksInInbox() {
        this.viewTasksInProject("Inbox");
    }

    viewTasksDueToday() {
        const dueDate = format(new Date(), "yyyy-MM-dd");
        const tasks = this.todoModel.readTaskByDueDate(dueDate);
        this.todoView.render(tasks, { dueDate: dueDate });
    }

    deleteTask(taskId) {
        this.todoModel.deleteTask(taskId);
        this.todoView.removeTaskCard(taskId);
    }

    updateTask(task) {
        this.todoModel.updateTask(task);
    }

    createTask(task) {
        task.id = crypto.randomUUID();
        this.todoModel.createTask(task);

        if (this.filterHelper.todayFilter) {
            this.viewTasksDueToday();
        }

        if (this.filterHelper.activeProject) {
            this.viewTasksInProject(this.filterHelper.activeProject);
        }
    }
}

export { TodoController };
