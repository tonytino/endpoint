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

  return (
    <li className={classes.Todo}>
      <button className={classes.TodoToggle}>
        {isComplete ? <CheckedBox /> : <UncheckedBox />}
      </button>

      {description}

      {dueDate}
    </li>
  );
}
