import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoslice';
import employeeReducer from './employeeslice';

// Function to save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error("Error saving state to localStorage", e);
  }
};

// Function to load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return undefined;
  }
};

// Load persisted state
const persistedState = loadStateFromLocalStorage();

// Configure store with preloaded state
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    employees: employeeReducer,
  },
  preloadedState: persistedState, // Load the state on app initialization
});

// Subscribe to store changes to save state
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});
