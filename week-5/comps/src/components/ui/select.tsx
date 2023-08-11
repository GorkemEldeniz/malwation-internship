// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";

const selectVariants = cva(
  "flex items-center justify-center cursor-pointer w-fit",
  {
    variants: {
      color: {
        default:
          "bg-transparent border-2 border-black outline-none text-black hover:opacity-50",
        blue: "bg-blue-500 text-white outline-blue hover:bg-blue-400",
        red: "bg-red-500 outline-red text-white hover:bg-red-400",
        yellow: "bg-yellow-500  outline-yellow text-white hover:bg-yellow-400",
      },
      modifier: {
        blue: "bg-transparent focus:outline-blue text-blue-500 border-2 border-blue-500 hover:text-blue-400",
        red: "bg-transparent focus:outline-red text-red-500 border-2 border-red-500 hover:text-red-400",
        yellow:
          "bg-transparent focus:outline-yellow text-yellow-500 border-2 border-yellow-500 hover:text-yellow-400",
      },
      size: {
        sm: "px-2 py-1 rounded text-sm gap-1",
        md: "px-4 py-2 rounded-md text-base gap-2",
        lg: "px-6 py-4 rounded-lg text-xl gap-4",
      },
    },
    compoundVariants: [
      {
        color: "yellow",
        size: "md",
        className: "animate-success",
      },
    ],
    defaultVariants: {
      color: "default",
      size: "md",
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "color" | "size">,
    VariantProps<typeof selectVariants> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      error = false,
      className,
      children,
      size,
      modifier,
      color,
      disabled,
      ...props
    }: SelectProps,
    ref
  ) => {
    return (
      <>
        <select
          ref={ref}
          className={cn(
            selectVariants({
              size,
              color,
              modifier,
              className,
            }),
            {
              "opactiy-600 cursor-not-allowed": disabled,
              "text-red-700 border-red-700": error,
            }
          )}
          disabled={disabled}
          {...props}
        >
          {children}
        </select>
        {error ? <div className="text-2xl text-red-700">Hata</div> : undefined}
      </>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
