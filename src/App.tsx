import { useEffect, useState } from 'react';
import { useThrottledCallback } from 'use-debounce';
import { Todo } from './components/Todo';
import { fetchTodos, patchTodo } from './lib/api';
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

  const toggleTodo = useThrottledCallback(
    async (toggledTodo: TodoType) => {
      setIsLoading(true);

      const isTodoNowCompleted = !toggledTodo.isComplete;
      const isPatchedSuccessfully = await patchTodo(toggledTodo.id, {
        isComplete: isTodoNowCompleted,
      });

      if (isPatchedSuccessfully) {
        setCompletedTodos((todos) => {
          if (isTodoNowCompleted) {
            return [
              ...todos,
              { ...toggledTodo, isComplete: isTodoNowCompleted },
            ];
          } else {
            return todos.filter(({ id }) => id !== toggledTodo.id);
          }
        });

        setPendingTodos((todos) => {
          if (isTodoNowCompleted) {
            return todos.filter(({ id }) => id !== toggledTodo.id);
          } else {
            // Need to sort the pending todos as well if adding to such given
            // this list is time-sensitive
            return sortTodos([
              ...todos,
              { ...toggledTodo, isComplete: isTodoNowCompleted },
            ]);
          }
        });
      }

      setIsLoading(false);
    },
    1000,
    { trailing: false }
  );

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
              onToggleComplete={toggleTodo}
              todo={todo}
            />
          );
        })}

        {completedTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              onToggleComplete={toggleTodo}
              todo={todo}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
