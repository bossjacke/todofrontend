
import React, { useState, useEffect } from "react";
import TodoList from "../components/todolist";
import {
  getAllTodos,
  deleteTodo,
  updateTodo,
  createTodo,
} from "../api/api";

const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const fetchtodos = async () => {
    try {
      const res = await getAllTodos();
      setTodos(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchtodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) {
      alert("Enter a title!");
      return;
    }
    try {
      await createTodo({ title: newTitle, description: newDescription });
      setNewTitle("");
      setNewDescription("");
      fetchtodos();
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      alert("Todo deleted successfully!");
      fetchtodos();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = async (id, updatedTitle) => {
    try {
      const existingTodo = todos.find((t) => t._id === id);
      await updateTodo(id, {
        title: updatedTitle,
        description: existingTodo.description,
      });
      alert("Todo updated successfully!");
      fetchtodos();
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>

      <div className="todoform">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default Homepage;
