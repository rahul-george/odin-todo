class ProjectModel {
    constructor(dataStore) {
        this.projectStore = dataStore;
        this.projects = this.projectStore.load();
    }

    save() {
        this.projectStore.save(this.projects);
    }

    createProject(project) {
        throw new Error("Not Implemented");
    }

    updateProject(project) {
        throw new Error("Not Implemented");
    }

    deleteProject(project) {
        throw new Error("Not Implemented");
    }

    readAllProjects() {
        return this.projects;
    }
}

export { ProjectModel };
