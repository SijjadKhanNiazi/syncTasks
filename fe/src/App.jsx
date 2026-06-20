import React from "react";
import { useTasks } from "./hooks/useTasks";
import useUiStore from "./store/useUiStore";

function App() {
  const { data: tasks, isLoading, isError, error } = useTasks();

  const { selectedTaskId, setSelectedTaskId } = useUiStore();

  if (isLoading)
    return <div style={{ padding: "20px" }}>Loading tasks from backend...</div>;
  if (isError)
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error: {error.message}
      </div>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1> SyncTask Dashboard</h1>

      <h3>Task List:</h3>
      <ul>
        {tasks?.map((task) => (
          <li
            key={task.id}
            onClick={() => setSelectedTaskId(task.id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background:
                selectedTaskId === task.id ? "#e0f7fa" : "transparent",
              borderBottom: "1px solid #ccc",
            }}
          >
            <strong>{task.name}</strong> -{" "}
            {task.complete ? " Completed" : " Pending"}
          </li>
        ))}
      </ul>

      {selectedTaskId && (
        <div
          style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5" }}
        >
          <p>
            Selected Task ID in Zustand Store: <strong>{selectedTaskId}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
