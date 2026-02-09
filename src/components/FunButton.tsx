import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FunButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const FunButton = React.forwardRef<HTMLButtonElement, FunButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText = "Working Magic... ⏳",
      icon,
      iconPosition = "right",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative transition-all duration-200",
          loading && "cursor-wait",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </>
        )}
      </Button>
    );
  }
);

FunButton.displayName = "FunButton";

export { FunButton };
