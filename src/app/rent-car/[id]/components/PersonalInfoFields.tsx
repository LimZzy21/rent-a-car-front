    import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { RentalFormData } from "@/common/validation/schemas/rent-car";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";


interface PersonalInfoFieldsProps {
  register: UseFormRegister<RentalFormData>;
  control: Control<RentalFormData>;
  errors: FieldErrors<RentalFormData>;
}

export const PersonalInfoFields = ({ register, control, errors }: PersonalInfoFieldsProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="font-medium">Full Name</label>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Enter your full name"
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none focus:ring-2 focus:ring-black"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>
      
    
      
      <div className="mb-4">
        <label className="font-medium">Phone Number</label>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <PatternFormat
              format="+38 ### ## ## ###"
              mask="_"
              placeholder="+38 095 35 98 404"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none focus:ring-2 focus:ring-black"
              allowEmptyFormatting
              value={value}
              onValueChange={(values) => {
                onChange(values.value);
              }}
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>
    </>
  );
}; 