import React, { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import useUiStore from "./store/useUiStore";

function App() {
  const [taskTitle, setTaskTitle] = useState("");

  // Custom hook se sab cheezein nikali
  const {
    data: tasks,
    isLoading,
    isError,
    error,
    addTask,
    isAdding,
  } = useTasks();
  const { selectedTaskId, setSelectedTaskId } = useUiStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    // Mutation function ko call kiya aur title pass kiya
    addTask(taskTitle);
    setTaskTitle(""); // Input field saaf kar di
  };

  if (isLoading) return <div style={{ padding: "20px" }}>Loading tasks...</div>;
  if (isError)
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error: {error.message}
      </div>
    );

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}
    >
      <h1>🔄 SyncTask Dashboard</h1>

      {/* Task Adding Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          disabled={isAdding}
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button
          type="submit"
          disabled={isAdding}
          style={{ padding: "8px 15px" }}
        >
          {isAdding ? "Adding..." : "Add Task"}
        </button>
      </form>

      <h3>Task List:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks?.map((task) => (
          <li
            key={task.id}
            onClick={() => setSelectedTaskId(task.id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background: selectedTaskId === task.id ? "#e0f7fa" : "#f9f9f9",
              marginBottom: "5px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <strong>{task.name}</strong> -{" "}
            {task.complete ? "✅ Completed" : "⏳ Pending"}
          </li>
        ))}
      </ul>

      {selectedTaskId && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#eee",
            borderRadius: "4px",
          }}
        >
          <p>
            Selected Task ID in Zustand: <strong>{selectedTaskId}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
