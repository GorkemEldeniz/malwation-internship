import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";
import Spinner from "./spinner";
import Icon from "./Icon";

const buttonVariants = cva(
  "flex items-center relative justify-center cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-black border-2 border-black hover:opacity-50",
        primary: "bg-blue-500 text-white hover:bg-blue-400",
        destructive: "bg-red-500 text-white hover:bg-red-400",
        alert: "bg-yellow-500 text-white hover:bg-yellow-400",
      },
      modifier: {
        outline:
          "bg-transparent text-blue-500 border-2 border-current hover:opacity-70",
      },
      size: {
        sm: "px-2 py-1 rounded text-sm gap-1",
        md: "px-4 py-2 rounded-md text-base gap-2",
        lg: "px-6 py-4 rounded-lg text-xl gap-4",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-70",
      },
    },
    compoundVariants: [
      {
        variant: ["primary", "destructive"],
        size: "md",
        className: "animate-success",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "color | disabled"
    >,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  loader?: boolean;
  label: string;
  IconLeft?: boolean;
  IconRigth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      IconLeft = false,
      IconRigth = false,
      modifier,
      size,
      children,
      disabled = false,
      label,
      variant,
      loader = false,
      ...props
    },
    ref
  ) => (
    <button
      className={cn(buttonVariants({ variant, modifier, size, className }), {})}
      ref={ref}
      disabled
      {...props}
    >
      {IconLeft && <Icon height="10" width="10" icon="icon-1" />}
      {label}
      {loader ? (
        <Spinner
          className="center"
          // fill={cn({
          //   white: variant == "primary",
          //   black: variant === "default",
          // })}
        />
      ) : undefined}
      {IconRigth && <Icon height="10" width="10" icon="icon-1" />}
    </button>
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
