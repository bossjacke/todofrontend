// import TodoList from "../components/todolist";
// import { getAllTodos, deleteTodo, updateTodo, createTodo } from "../api/api";
// import { useState } from "react";
// import { useEffect } from "react";


// const Homepage = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTitle, setNewTitle] = useState("");        // ✅ add this
//   const [newDescription, setNewDescription] = useState("");

//   const fetchtodos = async () => {
//     try {
//       const res = await getAllTodos();
//       setTodos(res.data)
//       console.log(res.data, "TodoList")
//     }
//     catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchtodos();   // why this
//   }, [])


//   const handleAddTodo = async () => {
//     if (!newTitle) return alert("Enter a title!");
//     try {
//       await createTodo({ title: newTitle, description: newDescription });
//       setNewTitle("");
//       setNewDescription("");
//       fetchtodos(); // refresh list
//     } catch (error) {
//       console.error("Add todo error:", error);
//     }
//   };


//   // DELETE
//   const handleDelete = async (id) => {
//     try {
//       await deleteTodo(id);
//       alert("Todo deleted successfully!");
//       fetchtodos(); // refresh list
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };
//   // ✏️ EDIT
//   const handleEdit = async (todo) => {
//     const newTitle = prompt("Edit title:", todo.title);
//     if (newTitle && newTitle !== todo.title) {
//       try {
//         await updateTodo(todo._id, { title: newTitle });
//         alert("Todo updated successfully!");
//         fetchtodos();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };


//   return (
//     <div>
//       <h2>Todo List</h2>

//       {/* Add Todo form */}
//       <div className="todoform">
//         <input
//           type="text"
//           placeholder="Title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newDescription}
//           onChange={(e) => setNewDescription(e.target.value)}
//         />
//         <button onClick={handleAddTodo}>Add Todo</button>
//       </div>

//       <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
//     </div>
//   );

// }

// export default Homepage;






import TodoList from "../components/todolist";
import { getAllTodos, deleteTodo, updateTodo, createTodo } from "../api/api";
import { useState } from "react";
import { useEffect } from "react";


const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const fetchtodos = async () => {
    try {
      const res = await getAllTodos();
      setTodos(res.data);
      console.log(res.data, "TodoList");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchtodos(); // fetch todos on mount
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle) return alert("Enter a title!");
    try {
      await createTodo({ title: newTitle, description: newDescription });
      setNewTitle("");
      setNewDescription("");
      fetchtodos(); // refresh list
    } catch (error) {
      console.error("Add todo error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      alert("Todo deleted successfully!");
      fetchtodos(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  //jansan - updated to accept new title from inline edit
  const handleEdit = async (id, updatedTitle) => {
    try {
      await updateTodo(id, { title: updatedTitle });
      alert("Todo updated successfully!");
      fetchtodos(); // refresh list
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

      {/* jansan - pass updated handleEdit */}
      <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};


export default Homepage;