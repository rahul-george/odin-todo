export class TaskCard {
  constructor(task, onEditCallback, onDeleteCallback) {
    /*
        @param: task is an object
        */
    this.id = task.id;
    this.title = task.title;
    this.dueDate = task.dueDate;
    this.isCompleted = task.isCompleted;
    this.onEditCallback = onEditCallback;
    this.onDeleteCallback = onDeleteCallback;
  }

  taskRepr() {
    return {
      id: this.id,
      title: this.title,
      dueDate: this.dueDate,
      isCompleted: this.isCompleted,
    };
  }

  onEdit(e) {
    this.onEditCallback(e, this.taskRepr());
  }

  onDelete(e) {
    this.onDeleteCallback(e, this.taskRepr());
  }

  render() {
    const task_card_fragment = document.createDocumentFragment();
    const task_card = document.createElement("div");
    task_card.classList.add("task");
    task_card_fragment.appendChild(task_card);

    task_card.appendChild(this.renderCheckbox());
    task_card.appendChild(this.renderTitle());
    task_card.appendChild(this.renderDate());
    task_card.appendChild(this.renderEditButton());
    task_card.appendChild(this.renderDeleteButton());
    return task_card_fragment;
  }

  renderCheckbox() {
    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.name = "status";
    inputElement.id = "status";
    if (this.isCompleted) {
      inputElement.checked = true;
    }
    inputElement.addEventListener("change", (e) => {
      this.isCompleted = e.target.checked;
      this.onEdit(e);
    });
    return inputElement;
  }

  renderTitle() {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "title";
    inputElement.id = "title";
    inputElement.value = this.title;
    inputElement.addEventListener("change", (e) => {
      this.title = e.target.value;
      this.onEdit(e);
    });
    return inputElement;
  }

  renderDate() {
    const inputElement = document.createElement("input");
    inputElement.type = "date";
    inputElement.name = "due-date";
    inputElement.id = "due-date";
    inputElement.addEventListener("change", (e) => {
      this.dueDate = e.target.value;
      this.onEdit(e);
    });
    return inputElement;
  }

  renderEditButton() {
    const inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.name = "edit-task-button";
    inputElement.id = "edit-task";
    inputElement.value = "Edit";
    inputElement.addEventListener("click", (e) => this.onEdit(e));
    return inputElement;
  }

  renderDeleteButton() {
    const inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.name = "delete-task-button";
    inputElement.id = "delete-task";
    inputElement.value = "Delete";
    inputElement.addEventListener("click", (e) => this.onDelete(e));
    return inputElement;
  }
}
