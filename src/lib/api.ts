import { Todo } from '../types/Todo';

const API_KEY = import.meta.env.VITE_API_KEY || '';
const BASE_URL = 'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io';
const HEADERS = new Headers({
  'Content-Type': 'application/json',
  'X-Api-Key': API_KEY,
});

/**
 * Fetches all Todos, including those that're overdue or completed
 */
export async function fetchTodos() {
  const todos = await fetcher('GET', {
    method: 'GET',
  });

  return todos as Todo[];
}

/**
 * Wrapper for fetch that handles errors and unsuccessful requests while also providing the required headers for all requests
 */
async function fetcher(endpoint: string, options: RequestInit) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: HEADERS,
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `Error encountered while handling request for /${endpoint}: ${response.status}`
      );
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Something went wrong: ${error.message}`);
    }
  }
}
