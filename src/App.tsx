import { useEffect, useState } from 'react';
import { fetchTodos } from './lib/api';
import { type Todo } from './types/Todo';
import classes from './App.module.css';

function App() {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingTodos, setPendingTodos] = useState<Todo[]>([]);

  // Fetch the initial state of the todos
  useEffect(() => {
    let isInitializing = true;

    async function fetchData() {
      const todosJson = await fetchTodos();

      if (todosJson && isInitializing) {
        const groupedTodos = todosJson.reduce<{
          completed: Todo[];
          pending: Todo[];
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
    </div>
  );
}

export default App;
