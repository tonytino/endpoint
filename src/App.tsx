import { useEffect, useState } from 'react';
import { Todo } from './components/Todo';
import { fetchTodos } from './lib/api';
import { type Todo as TodoType } from './types/Todo';
import { sortTodos } from './utils/sortTodos';
import classes from './App.module.css';

function App() {
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingTodos, setPendingTodos] = useState<TodoType[]>([]);

  // Fetch the initial state of the todos
  useEffect(() => {
    let isInitializing = true;

    async function fetchData() {
      const todosJson = await fetchTodos();

      if (todosJson && isInitializing) {
        const sortedTodos = sortTodos(todosJson);

        const groupedTodos = sortedTodos.reduce<{
          completed: TodoType[];
          pending: TodoType[];
        }>(
          (groupedTodos, currentTodo) => {
            if (currentTodo.isComplete) {
              groupedTodos.completed.push(currentTodo);
            } else {
              groupedTodos.pending.push(currentTodo);
            }

            return groupedTodos;
          },
          {
            completed: [],
            pending: [],
          }
        );

        setCompletedTodos(groupedTodos.completed);
        setPendingTodos(groupedTodos.pending);
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isInitializing = false;
    };
  }, []);

  console.log({
    completedTodos,
    pendingTodos,
  });

  return (
    <div>
      <h1>Todo App</h1>

      <div className={classes.LoadingContainer}>
        {isLoading && 'Loading...'}
      </div>

      <ul className={classes.Todos}>
        {pendingTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
            />
          );
        })}

        {completedTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
