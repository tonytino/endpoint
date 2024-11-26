import { useEffect, useState } from 'react';
import { fetchTodos } from './lib/api';
import classes from './App.module.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the initial state of the todos
  useEffect(() => {
    let isInitializing = true;

    async function fetchData() {
      const todosJson = await fetchTodos();

      if (todosJson && isInitializing) {
        console.log(todosJson);

        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isInitializing = false;
    };
  }, []);

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
