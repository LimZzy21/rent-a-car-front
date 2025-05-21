import { z } from "zod";

export const rentalFormSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    pickUpDate: z.string().min(1, "Please select a pickup date"),
    returnDate: z.string().min(1, "Please select a return date"),
    notes: z.string().optional(),
  }).refine((data) => {
    const pickUp = new Date(data.pickUpDate);
    const returnDate = new Date(data.returnDate);
    return returnDate > pickUp;
  }, {
    message: "Return date must be after pickup date",
    path: ["returnDate"],
  });
  
  export type RentalFormData = z.infer<typeof rentalFormSchema>;