import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/todoslice';
import AddTodoForm from '../components/addtodoform';

const TodoPage = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // State for editing functionality
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, newText: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-8 rounded-lg shadow-md w-11/12 mx-auto mt-8">
      <h1 className="text-center text-white text-3xl font-bold mb-6">Todo List</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <AddTodoForm />
        <table className="min-w-full mt-6 table-auto border-collapse">
          <thead>
            <tr className="text-left text-gray-600 uppercase text-sm border-b">
              <th className="p-2 w-12">#</th>
              <th className="p-2">Todo</th>
              <th className="p-2 w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <tr
                  key={todo.id}
                  className="hover:bg-gray-100 transition-all duration-200 border-b"
                >
                  <td className="p-2 text-gray-800">{index + 1}</td>

                  {/* Editable Field */}
                  <td className="p-2 text-gray-800">
                    {editId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="block overflow-hidden whitespace-nowrap text-ellipsis max-w-xs sm:max-w-md">
                        {todo.text}
                      </span>
                    )}
                  </td>

                  <td className="p-2 flex gap-2">
                    {/* Conditional Buttons */}
                    {editId === todo.id ? (
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(todo)}
                          className="bg-green-500 hover:bg-green-600 text-white px-5 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(deleteTodo(todo.id))}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-4">
                  No todos available. Add a new one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoPage;
