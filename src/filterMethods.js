import { format, isMatch } from "date-fns";

function filterByToday(tasks) {
  const today = format(new Date(), "yyyy-MM-dd");
  return tasks.filter((task) => isMatch(task.dueDate, today));
}

function filterByInbox(tasks) {
  return tasks.filter((task) => isMatch(task.dueDate, ""));
}

export { filterByToday, filterByInbox };
