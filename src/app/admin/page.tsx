"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCar } from "@/common/api/car/car";
import { CreateCarFormData } from "@/common/validation/schemas/car";
import toast from "react-hot-toast";

export default function AdminPage() {
  const queryClient = useQueryClient();

  const { mutate: createNewCar, isPending } = useMutation({
    mutationKey: ["createCar"],
    mutationFn: createCar,
    onSuccess: () => {
      toast.success("Car created successfully!");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error: Error) => {
      console.error("Error creating car:", error);
      toast.error(error.message || "Error creating car");
    },
  });

  const handleCreateCar = (data: CreateCarFormData) => {
    createNewCar(data);
  };

  return (
    <AdminGuard>
      <AdminPanel onCreateCar={handleCreateCar} isCreatingCar={isPending} />
    </AdminGuard>
  );
}
