class QuickFilterView {
    constructor() {
        this.inboxElement = document.querySelector("#filter-tasks-inbox");
        this.todayElement = document.querySelector("#filter-tasks-today");
    }

    render() {
        // Nothing to dynamically render
    }

    registerOnClickInbox(handler) {
        this.inboxElement.addEventListener("click", handler);
    }

    registerOnClickToday(handler) {
        this.todayElement.addEventListener("click", handler);
    }
}

export { QuickFilterView };
