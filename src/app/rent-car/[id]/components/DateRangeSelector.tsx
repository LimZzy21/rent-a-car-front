import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";
import { RentalFormData } from "@/common/validation/schemas/rent-car";  
import { Control, FieldErrors } from "react-hook-form";

interface DateRangeSelectorProps {
  control: Control<RentalFormData>;
  errors: FieldErrors<RentalFormData>;
  watchPickUpDate: string;
  isDateDisabled: (date: Date) => boolean;
}

export const DateRangeSelector = ({
  control,
  errors,
  watchPickUpDate,
  isDateDisabled,
}: DateRangeSelectorProps) => {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-1">
        <label className="font-medium">Pick-up Date</label>
        <Controller
          control={control}
          name="pickUpDate"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={value ? new Date(value) : null}
              onChange={(date) => {
                if (date) {
                  onChange(format(date, "yyyy-MM-dd"));
                } else {
                  onChange(null);
                }
              }}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none focus:ring-2 focus:ring-black"
              placeholderText="Select pick-up date"
              minDate={new Date()}
              maxDate={addDays(new Date(), 90)}
              filterDate={(date) => !isDateDisabled(date)}
              dateFormat="dd/MM/yyyy"
              showPopperArrow={false}
            />
          )}
        />
        {errors.pickUpDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.pickUpDate.message}
          </p>
        )}
      </div>

      <div className="flex-1">
        <label className="font-medium">Return Date</label>
        <Controller
          control={control}
          name="returnDate"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={value ? new Date(value) : null}
              onChange={(date) => {
                if (date) {
                  onChange(format(date, "yyyy-MM-dd"));
                } else {
                  onChange(null);
                }
              }}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none focus:ring-2 focus:ring-black"
              placeholderText="Select return date"
              minDate={
                watchPickUpDate
                  ? addDays(new Date(watchPickUpDate), 1)
                  : new Date()
              }
              maxDate={addDays(new Date(), 90)}
              filterDate={(date) => {
                if (isDateDisabled(date)) return false;
                if (watchPickUpDate && date <= new Date(watchPickUpDate))
                  return false;
                return true;
              }}
              dateFormat="dd/MM/yyyy"
              showPopperArrow={false}
            />
          )}
        />
        {errors.returnDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.returnDate.message}
          </p>
        )}
      </div>
    </div>
  );
};
