import { tv } from "tailwind-variants";

export const linkVariants = tv({
  base: "font-medium hover:underline",
  variants: {
    color: {
      blue: "text-blue-600",
      purple: "text-[#8368a3]",
    }
  },
  defaultVariants: {
    color: "purple"
  }
});