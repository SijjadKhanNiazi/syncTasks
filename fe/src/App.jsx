import React, { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import useUiStore from "./store/useUiStore";

function App() {
  const [taskTitle, setTaskTitle] = useState("");

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
    addTask(taskTitle);
    setTaskTitle("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Loading tasks...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-red-950 text-red-400 p-8 rounded-2xl border border-red-800 max-w-md text-center">
          <h2 className="text-2xl mb-2">⚠️ Error</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-white">
      <div className="max-w-2xl mx-auto p-6 pt-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30">
            🔄
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">SyncTask</h1>
            <p className="text-gray-400">Stay in sync • Get things done</p>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 mb-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              disabled={isAdding}
              className="flex-1 bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-2xl px-6 py-4 text-lg outline-none transition-all placeholder:text-gray-500 disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={isAdding}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-8 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-500/40"
            >
              {isAdding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Task"
              )}
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-300">Your Tasks</h3>
          <div className="text-sm text-gray-500">
            {tasks?.length || 0} total
          </div>
        </div>

        <div className="space-y-3">
          {tasks?.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-700 rounded-3xl p-12 text-center">
              <div className="text-5xl mb-4 opacity-50">📭</div>
              <p className="text-gray-400 text-lg">
                No tasks yet. Add one above!
              </p>
            </div>
          ) : (
            tasks?.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className={`group p-5 rounded-3xl border transition-all duration-200 cursor-pointer hover:shadow-xl ${
                  selectedTaskId === task.id
                    ? "bg-blue-950/50 border-blue-500 shadow-blue-500/20"
                    : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all ${
                        task.complete
                          ? "bg-green-500 text-black"
                          : "bg-gray-700 group-hover:bg-gray-600"
                      }`}
                    >
                      {task.complete ? "✓" : "○"}
                    </div>
                    <span
                      className={`text-lg font-medium ${
                        task.complete ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.name}
                    </span>
                  </div>

                  <div
                    className={`text-sm px-4 py-1.5 rounded-full font-medium ${
                      task.complete
                        ? "bg-green-500/10 text-green-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {task.complete ? "Completed" : "Pending"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Task Info */}
        {selectedTaskId && (
          <div className="mt-10 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                🎯
              </div>
              <p className="text-lg font-semibold">Selected Task</p>
            </div>
            <p className="text-3xl font-mono text-blue-400 tracking-wider">
              {selectedTaskId}
            </p>
            <p className="text-gray-400 text-sm mt-1">ID from Zustand store</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
