import { tv } from "tailwind-variants";

export const loadingVariants = tv({
  base: "inline text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    }
  },
  defaultVariants: {
    size: "md"
  }
})