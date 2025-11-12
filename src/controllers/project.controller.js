class ProjectController {
    constructor(projectView, projectModel, mediator) {
        this.projectView = projectView;
        this.projectModel = projectModel;
        this.mediator = mediator;
        // register handlers common handlers with the view
        this.projectView.registerOnClickHandler(this.handleOnClick.bind(this));
    }

    viewProjects() {
        // Read the project data from the model.
        // They will be project entities (or project objects)
        // Pass the project objects to view to render them.
        this.projectView.render(this.projectModel.readAllProjects());
        // this.projectView.registerOnClick(this.handleOnClick);
    }

    handleOnClick(e) {
        // If a project is clicked, we should load the todos belonging to that project.
        // Pass the projectId to the todo controller?
        this.mediator.publish("project:select", e.target.textContent);
    }

    deleteProject(projectId) {}

    updateProject(project) {}

    createProject(project) {}
}

export { ProjectController };
