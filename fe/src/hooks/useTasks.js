import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client"; // 1. Socket client import kiya

const API_URL = "http://localhost:5000/api/tasks";
const SOCKET_URL = "http://localhost:5000"; // Backend Socket ka URL

export const useTasks = () => {
  const queryClient = useQueryClient();

  // GET Query
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network error");
      return response.json();
    },
  });

  // POST Mutation
  const addTaskMutation = useMutation({
    mutationFn: async (title) => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Failed to add task");
      return response.json();
    },
    // Note: Ab hum onSuccess me invalidate nahi bhi karein to khair hai,
    // kyunki Socket ka event sab ko (hamein bhi) live update bhej dega!
  });

  // ⚡ 2. Real-time Socket Listener (The Climax)
  useEffect(() => {
    // Backend se haath milaya
    const socket = io(SOCKET_URL);

    // Backend se "task_created" ka signal sunna
    socket.on("task_created", (newTask) => {
      console.log("⚡ Live Event Received from Server:", newTask);

      // 🧠 Magic: TanStack Query ke cache ko khare-khare update karna
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        if (!oldTasks) return [newTask];
        return [...oldTasks, newTask]; // Purane tasks me naya live task jor diya
      });
    });

    // Cleanup: Jab component unmount ho to socket band kar do
    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return {
    ...tasksQuery,
    addTask: addTaskMutation.mutate,
    isAdding: addTaskMutation.isPending,
  };
};
