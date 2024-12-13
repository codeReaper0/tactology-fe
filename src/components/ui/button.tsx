import {cn} from "lib/utils";
import {VariantProps, cva} from "class-variance-authority";
import {ButtonHTMLAttributes, FC} from "react";
import Loader from "icons/loader1.svg";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center font-semibold rounded-md text-sm transition-color focus:outline-none disabled:pointer-events-none disabled:opacity-30 h-10",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outlined: "bg-transparent border border-primary text-primary",
      },
      size: {
        default: "py-3 px-5",
        sm: "py-2 px-5 h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({variant, size, className}))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 animate-spin">
          <Loader />
        </span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
