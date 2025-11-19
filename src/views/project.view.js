class ProjectView {
    constructor() {
        this.projectContainer = document.querySelector("#projects");
        this.onClickHandler = null;
    }

    render(projects) {
        // Passing the `this` keyword so that this.renderProject will run in correct context
        // And we can assign the this.onClickHandler to the project card straight forward.
        // This is equivalent to projects.map(this.renderProject.bind(this))
        projects.map(this.renderProject, this).forEach((element) => {
            this.projectContainer.appendChild(element);
        });
    }

    renderProject(project) {
      // <project name> <todo count>
      // On hover: <project name> <more icon button>
        const projectButton = document.createElement("button");
        projectButton.classList.add("project-card");
        projectButton.textContent = project.title;
        projectButton.addEventListener("click", (e) => {
            this.onClickHandler(e);
        });
        return projectButton;
    }

    registerOnClickHandler(handler) {
        this.onClickHandler = handler;
    }
}

export { ProjectView };
