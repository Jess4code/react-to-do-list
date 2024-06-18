import React from "react";
import "./app.scss";

export default function Todo({ todo, toggleTodo }) {
  function handleDoneClick() {
    toggleTodo(todo.id);
  }
  return (
    <div className="task">
      <li>
        <input type="checkbox" checked={todo.done} onChange={handleDoneClick} />
        <span
          style={{
            textDecoration: todo.done ? "line-through" : "none",
            opacity: todo.done ? "0.5" : "1",
          }}
        >
          {todo.name}
        </span>
      </li>
    </div>
  );
}
