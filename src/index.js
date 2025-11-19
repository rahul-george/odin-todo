import "./styles.css";
import { Mediator } from "./services/mediator";

import { ProjectModel } from "./models/project.model";
import { TodoModel } from "./models/todo.model";

import { ProjectView } from "./views/project.view";
import { TodoView } from "./views/todo.view";
import { QuickFilterView } from "./views/quickfilter.view";

import { ProjectController } from "./controllers/project.controller";
import { TodoController } from "./controllers/todo.controller";
import { QuickFilterController } from "./controllers/quickfilter.controller";

import { FileStorage } from "./storage";
import { FilterHelper } from "./services/filterhelper";

class App {
    constructor() {
        this.mediator = new Mediator();
        this.filterHelper = new FilterHelper(this.mediator);
        this.quickFilterController = new QuickFilterController(
            new QuickFilterView(),
            this.mediator
        );
        this.projectController = new ProjectController(
            new ProjectView(),
            new ProjectModel(new FileStorage("projects")),
            this.mediator
        );

        this.todoController = new TodoController(
            new TodoView(),
            new TodoModel(new FileStorage("tasks")),
            this.mediator, 
            this.filterHelper
        );
    }

    init() {
        this.projectController.viewProjects();
        this.quickFilterController.onClickToday();
    }
}

const app = new App();
app.init();
