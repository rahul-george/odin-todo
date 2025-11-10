import "./task-card.css";
import { Checkbox } from "./checkbox/checkbox";
import deleteIconSvg from "./deleteIcon.svg";

export class TaskCard {
  constructor(task, updateTask, deleteTask) {
    /*
        @param: task is an object
        */
    this.id = task.id;
    this.title = task.title;
    this.dueDate = task.dueDate;
    this.isCompleted = task.isCompleted;
    this.project = task.project;
    this.onEditCallback = updateTask;
    this.onDeleteCallback = deleteTask;
  }

  taskRepr() {
    return {
      id: this.id,
      title: this.title,
      dueDate: this.dueDate,
      isCompleted: this.isCompleted,
      project: this.project,
    };
  }

  onEdit(e) {
    this.onEditCallback(e, this.taskRepr());
  }

  onDelete(e) {
    this.onDeleteCallback(this.id);
  }

  render() {
    const task_card_fragment = document.createDocumentFragment();
    const task_card = document.createElement("div");
    task_card.dataset.taskId = this.id;
    task_card.classList.add("task");
    task_card_fragment.appendChild(task_card);

    task_card.appendChild(this.renderCheckbox());
    task_card.appendChild(this.renderTitle());
    task_card.appendChild(this.renderDate());
    // task_card.appendChild(this.renderEditButton());
    task_card.appendChild(this.renderDeleteButton());
    return task_card_fragment;
  }

  renderCheckbox() {
    const checkbox = new Checkbox(this.isCompleted, (e) => {
      this.isCompleted = e.target.checked;
      this.onEditCallback(this.taskRepr());
    });
    return checkbox.render();
  }

  renderTitle() {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "title";
    inputElement.id = "title";
    inputElement.value = this.title;
    inputElement.classList.add("task-title");
    inputElement.addEventListener("change", (e) => {
      this.title = e.target.value;
      this.onEditCallback(this.taskRepr());
    });
    return inputElement;
  }

  renderDate() {
    const inputElement = document.createElement("input");
    inputElement.type = "date";
    inputElement.name = "due-date";
    inputElement.id = "due-date";
    inputElement.value = this.dueDate;
    inputElement.addEventListener("change", (e) => {
      this.dueDate = e.target.value;
      this.onEditCallback(this.taskRepr());
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
    const inputElement = document.createElement("button");
    inputElement.type = "button";
    inputElement.classList.add("delete-button");
    inputElement.name = "delete-task-button";
    inputElement.innerHTML = `<svg fill="red" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 width="40px" height="40px" viewBox="0 0 372.693 372.693"
	 xml:space="preserve">
<g>
	<path d="M322.248,51.317h-67.296v-18.09C254.952,14.904,240.047,0,221.727,0h-70.755c-18.323,0-33.233,14.904-33.233,33.228v18.084
		H50.452c-18.324,0-33.237,14.906-33.237,33.218v35.38c0,9.535,7.755,17.285,17.297,17.285h23.476v202.274
		c0,18.321,14.907,33.225,33.225,33.225h194.472c18.32,0,33.236-14.915,33.236-33.225V137.201h19.264
		c9.535,0,17.294-7.75,17.294-17.285v-35.38C355.478,66.224,340.568,51.317,322.248,51.317z M152.308,34.576h68.067v16.741h-68.067
		V34.576z M153.353,306.316c0,9.188-7.485,16.67-16.681,16.67c-9.206,0-16.696-7.482-16.696-16.67v-139.59
		c0-9.196,7.491-16.693,16.696-16.693c9.196,0,16.681,7.497,16.681,16.693V306.316z M203.028,306.316
		c0,9.188-7.481,16.67-16.681,16.67c-9.197,0-16.681-7.482-16.681-16.67v-139.59c0-9.196,7.484-16.693,16.681-16.693
		c9.206,0,16.681,7.497,16.681,16.693V306.316z M252.723,306.316c0,9.188-7.493,16.67-16.692,16.67c-9.2,0-16.67-7.482-16.67-16.67
		v-139.59c0-9.196,7.47-16.693,16.67-16.693c9.199,0,16.692,7.497,16.692,16.693V306.316z"/>
</g>
</svg>`;
    inputElement.addEventListener("click", (e) => this.onDelete(e));
    return inputElement;
  }
}
