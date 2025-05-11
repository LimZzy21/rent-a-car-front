import React, { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string | React.ReactNode;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      containerClassName,
      labelClassName,
      checkboxClassName,
      errorClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={twMerge("flex flex-col", containerClassName)}>
        <div className="flex items-start sm:items-center gap-x-2">
          <input
            type="checkbox"
            ref={ref}
            className={twMerge("mt-1 sm:mt-0", checkboxClassName, className)}
            {...props}
          />
          {label && (
            <label
              htmlFor={props.id}
              className={twMerge(
                "text-gray-900 text-xs sm:text-base",
                labelClassName
              )}
            >
              {label}
            </label>
          )}
        </div>

        {error && (
          <p
            className={twMerge(
              "text-red-500 text-xs sm:text-sm mt-1",
              errorClassName
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox"; 