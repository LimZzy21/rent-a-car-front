import React, { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      helperTextClassName,
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={twMerge(
          "flex flex-col gap-y-[0.3rem] sm:gap-y-[0.5rem]",
          fullWidth && "w-full",
          containerClassName
        )}
      >
        {label && (
          <label
            htmlFor={props.id}
            className={twMerge(
              "text-gray-500 text-sm sm:text-base",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={twMerge(
            "border-2 border-gray-300 rounded-md p-2 sm:p-3 placeholder-gray-400 text-sm sm:text-base",
            error && "border-red-500",
            inputClassName,
            className
          )}
          {...props}
        />

        {error && (
          <p
            className={twMerge(
              "text-red-500 text-xs sm:text-sm",
              errorClassName
            )}
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            className={twMerge(
              "text-gray-500 text-xs sm:text-sm",
              helperTextClassName
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; 