import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:5000/api/tasks";

export const useTasks = () => {
  const queryClient = useQueryClient(); // 1. QueryClient ka access liya taake cache clear kar sakein

  // GET Query (Pehle wali)
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network error");
      return response.json();
    },
  });

  // POST Mutation (Nayi cheez)
  const addTaskMutation = useMutation({
    mutationFn: async (title) => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }), // Backend 'title' expect kar raha hai
      });
      if (!response.ok) throw new Error("Failed to add task");
      return response.json();
    },
    // 2. Kuch naya add hone ke baad kya karna hai?
    onSuccess: () => {
      // ⚡ Magic: React Query ko bolo ke ['tasks'] ka purana cache delete kare aur data re-fetch kare!
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    ...tasksQuery,
    addTask: addTaskMutation.mutate, // Is function ko UI me use karenge
    isAdding: addTaskMutation.isPending, // Loading state jab task add ho raha ho
  };
};
