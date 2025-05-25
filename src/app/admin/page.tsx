"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCar } from "@/common/api/car/car";
import { CreateCarFormData } from "@/common/validation/schemas/car";
import toast from "react-hot-toast";
import { deleteCar } from "@/common/api/admin/car";

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

  const { mutate: deleteCarById } = useMutation({
    mutationKey: ["deleteCar"],
    mutationFn: (id: string) => deleteCar(id),
    onSuccess: () => {
      toast.success("Car deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting car:", error);
    },
  });

  const handleCreateCar = (data: CreateCarFormData) => {
    createNewCar(data);
  };

  const handleDeleteCar = (id: string) => {
    deleteCarById(id);
  };

  return (
    <AdminGuard>
      <AdminPanel onCreateCar={handleCreateCar} isCreatingCar={isPending} onDeleteCar={handleDeleteCar} />
    </AdminGuard>
  );
}
