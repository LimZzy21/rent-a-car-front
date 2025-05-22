import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RentalFormData,
  rentalFormSchema,
} from "@/common/validation/schemas/rent-car";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { DateRangeSelector } from "./DateRangeSelector";
import { NotesField } from "./NotesField";

interface RentalFormProps {
  isDateDisabled: (date: Date) => boolean;
  onSubmit: (data: RentalFormData) => void;
  isPending: boolean;
}

export const RentalForm = ({ isDateDisabled, onSubmit, isPending }: RentalFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalFormSchema),
  });

  const watchPickUpDate = watch("pickUpDate");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 min-w-[320px]">
      <h2 className="text-2xl font-semibold mb-6">Book Your Dream Car</h2>

      <PersonalInfoFields
        register={register}
        control={control}
        errors={errors}
      />

      <DateRangeSelector
        control={control}
        errors={errors}
        watchPickUpDate={watchPickUpDate}
        isDateDisabled={isDateDisabled}
      />

      <NotesField register={register} />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white font-semibold text-lg rounded-md py-3 transition hover:bg-gray-800"
      >
        {isPending ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
};
