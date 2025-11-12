class QuickFilterController {
    constructor(quickFilterView, mediator) {
        this.quickFilterView = quickFilterView;
        this.mediator = mediator;

        this.quickFilterView.registerOnClickInbox(() =>
            this.mediator.publish("inbox:select")
        );
        this.quickFilterView.registerOnClickToday(() =>
            this.mediator.publish("today:select")
        );
    }
}

export { QuickFilterController };
