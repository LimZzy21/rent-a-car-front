import { Spinner } from "../Utils/Spinner";

interface ButtonProps {
  variant?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const getVariantStyles = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-black text-white  hover:opacity-80 cursor-pointer rounded-xl";
    case "secondary":
      return "bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl";
    case "text":
      return "bg-transparent hover:bg-gray-100 text-gray-900 cursor-pointer rounded-md";
    default:
      return "bg-blue-500 hover:bg-blue-600 text-white";
  }
};

const getSizeStyles = (size: ButtonProps["size"]) => {
  switch (size) {
    case "small":
      return "px-3 py-1.5 text-sm";
    case "medium":
      return "px-4 py-2 text-base";
    case "large":
      return "lg:px-6 lg:py-3 px-4 py-2 text-md lg:text-lg";
    default:
      return "px-4 py-2 text-base";
  }
};

export const CustomButton = ({
  variant = "primary",
  size = "medium",
  isLoading,
  disabled,
  onClick,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`
          ${getVariantStyles(variant)}
          ${getSizeStyles(size)}
          ${className}
        `}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
