import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import "./app.scss"

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function TodoList() {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.done = !todo.done;
    setTodos(newTodos);
  }

  function handleAddTask(e) {
    const name = todoNameRef.current.value;
    if (name.trim() === "") return; 
    setTodos(prevTodos => [...prevTodos, {name: name, id: uuidv4(), done: false}])
    todoNameRef.current.value = null;
  }

  function filterDone() {
    const newTodos = todos.filter(todo => !todo.done);
    setTodos(newTodos);
  }

  return (
    <div className='app'>
      <input id='input' ref={todoNameRef} type='text' placeholder='Walk the dog...'/>
      <div className='buttons'>
        <button id='add' onClick={handleAddTask}>Add Task</button>
        <button id='clear' onClick={filterDone}>Clear done tasks</button>
      </div>
      <ul className='tasks'>
        {todos.map(todo => <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>)}
      </ul>
      <div id='left'>there is `{todos.filter(todo => !todo.done).length} tasks left to do</div>
    </div>
  )
}
