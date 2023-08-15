import { InputHTMLAttributes, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";
import Spinner from "./spinner";
import Icon from "./Icon";

const inputVariants = cva(
  "flex-1 px-2 py-1 border-2 text-black border-black rounded-md inline-block focus:outline-gray-700",
  {
    variants: {
      variant: {
        default: "bg-transparent  border-black",
        primary: "border-blue-500 focus:outline-blue-400",
        alert: "border-yellow-500 focus:outline-yellow-400",
      },
      size: {
        sm: "px-2 py-1 rounded text-sm gap-1",
        md: "px-4 py-2 rounded-md text-base gap-2",
        lg: "px-6 py-4 rounded-lg text-xl gap-4",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      error: {
        true: "border-red-500  focus:outline-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type Mode = "secret" | "email" | "user" | "tel";

interface InputProp
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled">,
    VariantProps<typeof inputVariants> {
  loading?: boolean;
  mode?: Mode;
}

function Input({
  disabled,
  maxLength = 12,
  variant,
  loading,
  error,
  size,
  type,
  mode,
  className,
  ...rest
}: InputProp) {
  const [visible, setVisible] = useState(false);

  const handlePasswordType = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative w-fit">
      {mode && (
        <Icon
          onClick={mode === "secret" ? handlePasswordType : undefined}
          icon={mode === "secret" ? (visible ? "lock" : "eye") : mode}
          width="20"
          height="20"
          className={cn("z-10 absolute top-1/2 translate-y-[-50%] right-2", {
            "fill-blue-500": variant === "primary",
            "fill-red-500": error,
            "fill-yellow-500": variant === "alert",
            "fill-black": variant === "default",
            "cursor-pointer": mode === "secret",
          })}
        />
      )}
      {loading && (
        <Spinner
          className={cn("absolute top-1/2 translate-y-[-50%] right-2", {
            "fill-blue-500": variant === "primary",
            "fill-red-500": error,
            "fill-yellow-500": variant === "alert",
            "fill-black": variant === "default",
          })}
          width="10"
          height="10"
        />
      )}
      <input
        maxLength={maxLength}
        disabled={!!disabled}
        type={mode !== "secret" ? type : visible ? "text" : "password"}
        className={cn(
          inputVariants({
            size,
            variant,
            disabled,
            error,
            className,
          })
        )}
        {...rest}
      />
    </div>
  );
}

export default Input;
