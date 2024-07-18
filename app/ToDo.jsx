'use client';
import React, { useEffect, useState } from 'react';
import './globals.css';

export const ToDo = () => { 

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]); 
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');  
  const [completedTodos, setCompletedTodos] = useState([]);
  
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      isComplete: false
    };

    const updatedTodos = [...allTodos];
    updatedTodos.push(newTodoItem);
    setAllTodos(updatedTodos);
    setNewTitle('');
    setNewDescription('');
    localStorage.setItem('allTodos', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    setAllTodos(updatedTodos);
    localStorage.setItem('allTodos', JSON.stringify(updatedTodos));
  };

  const handleDeleteCompletedTodo = (index) => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  };

  const handleCompleteTodo = (index) => {
    const updatedTodos = [...allTodos];
    const completedTodo = updatedTodos.splice(index, 1)[0];
    completedTodo.isComplete = true;
    setAllTodos(updatedTodos);
    const updatedCompletedTodos = [...completedTodos, completedTodo];
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem('allTodos', JSON.stringify(updatedTodos));
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('allTodos');
    const savedCompletedTodos = localStorage.getItem('completedTodos');
    if (savedTodos) {
      setAllTodos(JSON.parse(savedTodos));
    }
    if (savedCompletedTodos) {
      setCompletedTodos(JSON.parse(savedCompletedTodos));
    }
  }, []);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold text-center text-white mb-4">My To-Do-App</h1>

      <div className="todo-wrapper bg-slate-600 rounded-sm p-4 md:p-6 lg:p-12 lg:ml-[10rem] lg:mr-[10rem]">
        <div className="todo-input flex flex-wrap justify-center gap-4 p-4">
          <div className="todo-input-item w-full md:w-1/2 lg:w-1/3">
            <label className="text-slate-200 text-xl" htmlFor="Title">Title:</label>
            <input 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-xl text-gray-300 w-full bg-slate-800 rounded-sm border-blue-500 border-2 p-2"
              type="text"
              name="Title"
              id="Title"
              placeholder="Title"
            />
          </div>

          <div className="todo-input-item w-full md:w-1/2 lg:w-1/3">
            <label className="text-slate-200 text-xl" htmlFor="Description">Description:</label>
            <input 
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="text-xl text-gray-300 w-full bg-slate-800 rounded-sm border-blue-500 border-2 p-2"
              type="text"
              name="Description"
              id="Description"
              placeholder="Description"
            />
          </div>

          <div className="todo-input-item w-full md:w-1/2 lg:w-1/3 flex justify-center">
            <button 
              onClick={handleAddTodo}
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full md:w-auto lg:w-[90%]"
            >
              Add
            </button>
          </div>
        </div> 

        <div className="line border-t-2 my-4"></div>

        <div className="status flex justify-center gap-4">
          <button
            onClick={() => setIsCompleteScreen(false)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
          >
            All Todos
          </button>
          <button
            onClick={() => setIsCompleteScreen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          >
            Completed
          </button>
        </div>

        {isCompleteScreen ? (
          completedTodos.map((item, index) => (
            <div key={index} className="todo-container w-full p-2 mt-4 flex flex-wrap justify-between bg-slate-800">
              <div className="todo-item-left w-full md:w-1/2 lg:w-2/3">
                <h3 className="todo-item-label text-green-500 text-2xl font-bold">{item.title}</h3>
                <p className="todo-item-label text-slate-300">{item.description}</p> 
              </div>   
              <div className="todo-item-right w-full md:w-1/2 lg:w-1/3 flex justify-end">
                <button 
                  onClick={() => handleDeleteCompletedTodo(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          allTodos.map((item, index) => (
            <div key={index} className="todo-container w-full p-2 mt-4 flex flex-wrap justify-between bg-slate-800">
              <div className="todo-item-left w-full md:w-1/2 lg:w-2/3">
                <h3 className="todo-item-label text-green-500 text-2xl font-bold">{item.title}</h3>
                <p className="todo-item-label text-slate-300">{item.description}</p>
              </div>

              <div className="todo-item-right w-full md:w-1/2 lg:w-1/3 flex justify-end">
                <button 
                  onClick={() => handleDeleteTodo(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleCompleteTodo(index)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                >
                  Completed
                </button>
              </div>  
            </div>
          ))
        )}
      </div>
    </div>
  );
};
