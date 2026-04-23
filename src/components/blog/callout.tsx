import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  ShieldAlert,
  MessageSquareWarning,
  ChevronDown,
} from "lucide-react";
import type { ReactNode } from "react";

const calloutConfig = {
  note: {
    style: "border-blue-500 dark:bg-blue-950/5",
    textColor: "text-blue-700 dark:text-blue-300",
    Icon: Info,
  },
  tip: {
    style: "border-green-500 dark:bg-green-950/5",
    textColor: "text-green-700 dark:text-green-300",
    Icon: Lightbulb,
  },
  warning: {
    style: "border-amber-500 dark:bg-amber-950/5",
    textColor: "text-amber-700 dark:text-amber-300",
    Icon: AlertTriangle,
  },
  danger: {
    style: "border-red-500 dark:bg-red-950/5",
    textColor: "text-red-700 dark:text-red-300",
    Icon: ShieldAlert,
  },
  important: {
    style: "border-purple-500 dark:bg-purple-950/5",
    textColor: "text-purple-700 dark:text-purple-300",
    Icon: MessageSquareWarning,
  },
} as const;

const calloutVariants = cva("relative px-4 py-3 my-6 border-l-4 text-sm", {
  variants: {
    variant: {
      note: calloutConfig.note.style,
      tip: calloutConfig.tip.style,
      warning: calloutConfig.warning.style,
      danger: calloutConfig.danger.style,
      important: calloutConfig.important.style,
    },
  },
  defaultVariants: { variant: "note" },
});

interface CalloutProps extends VariantProps<typeof calloutVariants> {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Callout({
  variant = "note",
  title,
  children,
  defaultOpen = true,
  className,
}: CalloutProps) {
  const config = calloutConfig[variant || "note"];
  const IconComponent = config.Icon;

  return (
    <details
      className={cn(
        calloutVariants({ variant }),
        "[&[open]>summary_svg:last-child]:rotate-180 [&[open]>summary]:mb-3",
        className
      )}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer items-center font-medium [&::-webkit-details-marker]:hidden">
        <IconComponent
          className={cn("mr-2 size-4 shrink-0", config.textColor)}
        />
        <span className={cn("font-medium mr-2", config.textColor)}>
          {variant && variant.charAt(0).toUpperCase() + variant.slice(1)}
          {title && (
            <span className="font-normal opacity-70"> ({title})</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
            config.textColor
          )}
        />
      </summary>
      <div>{children}</div>
    </details>
  );
}
