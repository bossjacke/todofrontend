

import axios from "axios";

const API_URL = "http://localhost:3001"; // your backend URL

// GET all todos
 const getAllTodos = () => axios.get(`${API_URL}/todos`);

// POST: create  new todo
 const createTodo = (todo) => axios.post(`${API_URL}/todos`, todo);

// DELETE  todo by id
 const deleteTodo = (id) => axios.delete(`${API_URL}/todos/${id}`);

// PUT: update  todo by id
 const updateTodo = (id, updatedTodo) =>
  axios.put(`${API_URL}/todos/${id}`, updatedTodo);

 export{getAllTodos,createTodo,deleteTodo,updateTodo};