import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodoPage from './pages/todopage';

const App = () => {
  return (
    <div className='bg-gray-100'>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          {/* Add more routes for EmployeeList */}
        </Routes>
      </BrowserRouter>
    </Provider>
    </div>
  );
};

export default App;
