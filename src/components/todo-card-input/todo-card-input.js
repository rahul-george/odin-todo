import "./todo-card-input.css";

const priorityOptions = ["High", "Medium", "Low"];
const defaultPriority = "Low";

class TodoCardInput {
    constructor(task, onSubmit, onReset) {
        this.task = task ?? { priority: defaultPriority }; // model that holds the tasks
        this.mode = this.task?.id ? "create" : "edit";
        this.onSubmit = onSubmit;
        this.onReset = onReset;

        // card-elements
        this.todoCard = null;
        this.titleElement = null;
        this.projectElement = null;
        this.dueDateElement = null;
        this.priorityElement = null;
    }

    reset() {
        this.task = { priority: defaultPriority };
        this.titleElement.value = this.task?.title ?? "";
        this.projectElement.value = this.task?.project;
        this.dueDateElement.value = this.task?.dueDate;
        this.priorityElement.value = this.task?.priority;

        if (this.onReset) this.onReset();
    }

    render() {
        const todoInputCard = document.createElement("div");
        todoInputCard.classList.add("todo-card");

        // Title
        const titleInput = document.createElement("input");
        titleInput.id = "todo-card-title";
        titleInput.title = "todo-card-title";
        titleInput.classList.add("todo-card-title");
        titleInput.type = "text";
        todoInputCard.appendChild(titleInput);
        if (this.task?.title) {
            titleInput.value = this.task.title;
        }
        titleInput.addEventListener("change", (e) => {
            this.task.title = e.target.value;
        });

        // Project
        const projectSelect = document.createElement("select");
        projectSelect.classList.add("todo-card-project-select");
        //fixme: Use on click to fetch the options.
        projectSelect.addEventListener("change", (e) => {
            this.task.project = e.target.value;
        });
        todoInputCard.appendChild(projectSelect);

        // Due date
        const dueDateSelect = document.createElement("input");
        dueDateSelect.id = "todo-card-date-select";
        dueDateSelect.title = "todo-card-date-select";
        dueDateSelect.classList.add("todo-card-date-select");
        dueDateSelect.type = "date";
        dueDateSelect.addEventListener("change", (e) => {
            this.task.dueDate = e.target.value;
        });
        todoInputCard.appendChild(dueDateSelect);

        // Priority
        const prioritySelect = document.createElement("select");
        prioritySelect.id = "todo-card-priority-select";
        prioritySelect.title = "todo-card-priority-select";
        prioritySelect.classList.add("todo-card-priority-select");
        for (let option of priorityOptions) {
            const prioritySelectOption = document.createElement("option");
            prioritySelectOption.value = option;
            prioritySelectOption.textContent = option;
            if (option == defaultPriority) {
                prioritySelectOption.selected = true;
            }
            prioritySelect.appendChild(prioritySelectOption);
        }
        prioritySelect.addEventListener("change", (e) => {
            this.task.priority = e.target.value;
        });
        todoInputCard.appendChild(prioritySelect);

        const submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "submit";
        submitButton.addEventListener("click", (e) => {
            this.onSubmit(this.task);
            this.reset();
        });
        todoInputCard.appendChild(submitButton);

        const resetButton = document.createElement("input");
        resetButton.type = "reset";
        resetButton.value = "reset";
        resetButton.addEventListener("click", this.reset.bind(this));
        todoInputCard.appendChild(resetButton);

        this.todoCard = todoInputCard;
        this.titleElement = titleInput;
        this.projectElement = projectSelect;
        this.dueDateElement = dueDateSelect;
        this.priorityElement = prioritySelect;

        return todoInputCard;
    }
}

export { TodoCardInput };
