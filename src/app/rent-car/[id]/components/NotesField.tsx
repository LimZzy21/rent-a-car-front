import { RentalFormData } from "@/common/validation/schemas/rent-car";
import { UseFormRegister } from "react-hook-form";

interface NotesFieldProps {
  register: UseFormRegister<RentalFormData>;
}

export const NotesField = ({ register }: NotesFieldProps) => {
  return (
    <div className="mb-6">
      <label className="font-medium">
        Additional Notes{" "}
        <span className="text-gray-500 font-normal">(optional)</span>
      </label>
      <textarea
        {...register("notes")}
        placeholder="Let us know anything special..."
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none min-h-[60px] resize-y"
      />
    </div>
  );
}; 