import "./project-card.css";

class ProjectCard {
  constructor(project, onProjectClick) {
    this.id = project.id;
    this.title = project.title;
    this.onProjectClick = onProjectClick;
  }

  render() {
    const projectButton = document.createElement("button");
    projectButton.classList.add("project-card");
    projectButton.textContent = this.title;

    projectButton.addEventListener("click", (e) =>
      this.onProjectClick(this.title),
    );
    return projectButton;
  }
}

export { ProjectCard };
