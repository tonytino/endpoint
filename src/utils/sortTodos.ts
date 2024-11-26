import { type Todo } from '../types/Todo';

/**
 * Sorts an array of todos based on their due dates
 */
export function sortTodos(todos: Todo[]) {
  return [...todos].sort(
    ({ dueDate: firstDueDate }, { dueDate: secondDueDate }) => {
      // Check if either dueDate is null and respond accordingly
      if (!firstDueDate && !secondDueDate) return 0;
      if (!firstDueDate) return 1;
      if (!secondDueDate) return -1;

      return firstDueDate.localeCompare(secondDueDate);
    }
  );
}
