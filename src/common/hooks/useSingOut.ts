import { useQueryClient } from "@tanstack/react-query";

export const useSingOut = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    queryClient.setQueryData(["userProfile"], null);
    localStorage.removeItem("token");
  };
};
