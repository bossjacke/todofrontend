// import React from "react";
// import "./todolist.css";

// const TodoList = ({ todos, onDelete, onEdit }) => {
//   if (!todos || todos.length === 0) {
//     return <p className="empty"></p>;
//   }

//   return (
//     <div className="list">
//       {todos.map((todo) => (
//         <div className="item" key={todo._id}>
//           <div className="content">
//             <h3>{todo.title}</h3>
//             <p>{todo.description || "No description"}</p>
//           </div>

//           <div className="actions">
//             <button className="edit" onClick={() => onEdit(todo)}>
//               ✏️ Edit
//             </button>
//             <button className="delete" onClick={() => onDelete(todo._id)}>
//               🗑️ Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TodoList;


import React, { useState } from "react";
import "./todolist.css";


const TodoList = ({ todos, onDelete, onEdit }) => {
  const [editId, setEditId] = useState(null); // jansan
  const [editTitle, setEditTitle] = useState(""); // jansan

  if (!todos || todos.length === 0) {
    return <p className="empty"></p>;
  }

  return (
    <div className="list">
      {todos.map((todo) => (
        <div className="item" key={todo._id}>
          <div className="content">
            {/* jansan - toggle between view and edit mode */}
            {editId === todo._id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <h3>{todo.title}</h3>
            )}
            <p>{todo.description || "No description"}</p>
          </div>

          <div className="actions">
            {editId === todo._id ? (
              <>
                <button
                  className="save"
                  onClick={() => {
                    onEdit(todo._id, editTitle); // jansan
                    setEditId(null);
                    setEditTitle("");
                  }}
                >
                  💾 Save
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setEditId(null);
                    setEditTitle("");
                  }}
                >
                  X Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit"
                  onClick={() => {
                    setEditId(todo._id); // jansan
                    setEditTitle(todo.title); // jansan
                  }}
                >
                  ✏️ Edit
                </button>
                <button className="delete" onClick={() => onDelete(todo._id)}>
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;