import { format, isMatch } from "date-fns";

function filterByToday(tasks) {
  const today = format(new Date(), "yyyy-MM-dd");
  return tasks.filter((task) => isMatch(task.dueDate, today));
}

function filterByProject(project) {
  if (!project) console.error("Project is", project);
  return (tasks) => tasks.filter((task) => task.project === project);
}

export { filterByToday, filterByProject };
