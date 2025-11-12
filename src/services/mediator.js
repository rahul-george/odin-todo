class Mediator {
    constructor() {
        this.registry = {};
    }

    subscribe(event, handler) {
        if (event in this.registry) {
            this.registry[event].push(handler);
        } else {
            this.registry[event] = [handler];
        }
    }

    publish(event, args) {
        // call the listeners for the event with the arguments
        // if the event itself is not available, raise warning
        if (event in this.registry) {
            this.registry[event].forEach((eachListener) => {
                eachListener(args);
            });
        } else {
            console.warn(`${event} does not exist`);
        }
    }
}

export { Mediator };
