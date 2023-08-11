import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";
import Spinner from "./spinner";

const buttonVariants = cva("flex items-center justify-center cursor-pointer", {
  variants: {
    color: {
      default:
        "bg-transparent text-black border-2 border-black hover:opacity-50",
      blue: "bg-blue-500 text-white hover:bg-blue-400",
      red: "bg-red-500 text-white hover:bg-red-400",
      yellow: "bg-yellow-500 text-white hover:bg-yellow-400",
    },
    modifier: {
      blue: "bg-transparent text-blue-500 border-2 border-blue-500  hover:opacity-70",
      red: "bg-transparent text-red-500 border-2 border-red-500  hover:opacity-70",
      yellow:
        "bg-transparent text-yellow-500 border-2 border-yellow-500  hover:opacity-70",
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
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color,
      modifier,
      size,
      children,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      className={cn(buttonVariants({ color, modifier, size, className }), {
        "opacity-60 cursor-not-allowed": disabled,
        "text-transparent": loading,
        relative: loading,
      })}
      ref={ref}
      disabled
      {...props}
    >
      {children}
      {loading ? (
        <Spinner
          className="center"
          fill={cn({
            white: color,
            "rgb(234 179 8)": modifier === "yellow",
            "rgb(59 130 246)": modifier === "blue",
            "rgb(239 68 68)": modifier === "red",
            black: color === "default",
          })}
        />
      ) : undefined}
    </button>
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
