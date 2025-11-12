# Odin Todo App

Project implemented as part of the Odin Project. 

## Requirements

1. A task should have a `title`, `description`, `dueDate`, `priority`
2. Should be able to create multiple task list or projects.
3. There should be a default tasklist/project to which tasks are assigned. Like an Inbox. 
4. Should be able to expand a single task and view it's details.
5. Priority should have colors: None - grey, high - red, medium - orange, low - green
6. View all projects
7. Modify a task
8. Delete a task

## Design
I choose MVC pattern as the architecture for this application. 

- src/index.js: Holds the controllers and does initialization. 
- src/controllers/todo.controller.js: Controller for all todo activities. 
- src/views/todo.view.js: Generate the todo app. 
- src/model/todo.model.js: Interact with the file storage (or API)

- src/views/project.view.js: Renders the project names on the screen and relays the on click events
- src/controllers/project.controller.js: Controller for project activities
- src/model/project.model.js: Interact with file storage (or API)

- src/views/quickfilter.view.js: handles the interaction with quick filters on the side. 
- src/controller/quickfilter.controller.js: controller for communicating between quick filter and task

- src/services/mediator.js: Sometimes we need to interact between two controllers like when project is clicked, update the list of tasks
    mediator stores the events and the listeners. When an event is published, it notifies all the listeners. 