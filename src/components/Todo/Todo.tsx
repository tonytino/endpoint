import clsx from 'clsx';
import { type Todo } from '../../types/Todo';
import { dateFormatter } from '../../utils/dateFormatter';
import { CheckedBox } from '../CheckedBox';
import { UncheckedBox } from '../UncheckedBox';
import classes from './Todo.module.css';

type TodoProps = {
  /**
   * Function to invoke when a Todo's completion status is toggled
   */
  onToggleComplete: (todo: Todo) => void;
  todo: Todo;
};

export function Todo(props: TodoProps) {
  const { onToggleComplete, todo } = props;
  const { description, dueDate, isComplete } = todo;

  const currentTime = new Date();
  /**
   * Passing null to new Date returns a Date object representing the Unix epoch. Instead, we'll default to Invalid Date for such a scenario and check if dueDate is truthy before attempting to use this variable
   */
  const parsedDueDate = new Date(dueDate || NaN);
  const isOverdue = dueDate && parsedDueDate.valueOf() < currentTime.valueOf();

  return (
    <li
      className={clsx({
        [classes.Todo]: true,
        [classes.completed]: isComplete,
        [classes.overdue]: isOverdue,
      })}
    >
      <div className={classes.TodoLeftContents}>
        <button
          className={classes.TodoToggle}
          onClick={() => onToggleComplete(todo)}
        >
          {isComplete ? <CheckedBox /> : <UncheckedBox />}
        </button>

        <span className={classes.description}>{description}</span>
      </div>

      {dueDate && <span>{dateFormatter.format(parsedDueDate)}</span>}
    </li>
  );
}
