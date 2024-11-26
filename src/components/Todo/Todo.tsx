import clsx from 'clsx';
import { type Todo } from '../../types/Todo';
import { CheckedBox } from '../CheckedBox';
import { UncheckedBox } from '../UncheckedBox';
import classes from './Todo.module.css';

type TodoProps = {
  todo: Todo;
};

export function Todo(props: TodoProps) {
  const { todo } = props;
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
      <button className={classes.TodoToggle}>
        {isComplete ? <CheckedBox /> : <UncheckedBox />}
      </button>

      <span className={classes.description}>{description}</span>

      {dueDate}
    </li>
  );
}
