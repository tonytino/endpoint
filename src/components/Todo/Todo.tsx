import { type Todo } from '../../types/Todo';
import classes from './Todo.module.css';

type TodoProps = {
  todo: Todo;
};

export function Todo(props: TodoProps) {
  const { todo } = props;
  const { description, dueDate, isComplete } = todo;

  return (
    <li className={classes.Todo}>
      {isComplete}

      {description}

      {dueDate}
    </li>
  );
}
