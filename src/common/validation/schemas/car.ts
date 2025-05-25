import { z } from "zod";

export const createCarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  carDetails: z.object({
    fuelType: z.string().min(1, "Fuel type is required"),
    transmission: z.string().min(1, "Transmission is required"),
    mileage: z.number().min(0, "Mileage must be positive"),
    engineSize: z.number().min(0, "Engine size must be positive"),
    enginePower: z.number().min(0, "Engine power must be positive"),
    topSpeed: z.number().min(0, "Top speed must be positive"),
    acceleration: z.number().min(0, "Acceleration must be positive"),
  }),
  images: z.array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
  features: z.array(z.string())
    .min(1, "At least one feature is required"),
});

export type CreateCarFormData = z.infer<typeof createCarSchema>; 