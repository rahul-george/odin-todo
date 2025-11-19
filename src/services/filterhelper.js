class FilterHelper {
    constructor(mediator) {
        this.mediator = mediator;

        // when page loads, todayFilter is true and activeProject is null
        this.todayFilter = true;
        this.activeProject = null;

        this.subscribe();
    }

    // if a project is selected, store that as the active project.
    // if inbox is selected, store that as the active project.
    // if today is selected, store todayFilter as true and active project as null
    subscribe() {
        this.mediator.subscribe("today:select", () => {
            this.todayFilter = true;
            this.activeProject = null;
        });

        this.mediator.subscribe("inbox:select", () => {
            this.todayFilter = false;
            this.activeProject = "Inbox";
        });

        this.mediator.subscribe("project:select", (projectName) => {
            this.todayFilter = false;
            this.activeProject = projectName;
        });
    }
}

export { FilterHelper };
