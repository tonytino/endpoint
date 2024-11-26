import { useEffect } from 'react';
import { fetchTodos } from './lib/api';

function App() {
  // Fetch the initial state of the todos
  useEffect(() => {
    let isInitializing = true;

    async function fetchData() {
      const todosJson = await fetchTodos();

      if (todosJson && isInitializing) {
        console.log(todosJson);
      }
    }

    fetchData();

    return () => {
      isInitializing = false;
    };
  }, []);

  return <></>;
}

export default App;
