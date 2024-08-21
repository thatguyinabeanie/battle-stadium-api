import type { PropsWithChildren } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      header: "text-2xl font-bold",
      body: "text-base",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

interface Props extends PropsWithChildren, VariantProps<typeof textVariants> {
  className?: string;
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Text: React.FC<Props> = ({ className, variant, children, tag = "p" }) => {
  const Component = tag;

  return <Component className={cn(textVariants({ variant, className }))}>{children}</Component>;
};
