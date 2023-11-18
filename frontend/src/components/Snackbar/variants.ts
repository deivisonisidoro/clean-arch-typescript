import { tv } from "tailwind-variants";

export const snackbar = tv({
  base: "fixed bottom-0 left-0 border px-4 py-3 rounded transition-transform duration-300 ease-in-out transform translate-y-full",
  variants: {
    type: {
      success: "bg-green-100 border-green-400 text-green-700",
      info: "bg-blue-100 border-blue-400 text-blue-700",
      warning: "bg-red-100 border-yellow-400 text-yellow-700",
      error: "bg-red-100 border-red-400 text-red-700",
    }
  },
  defaultVariants: {
    type: "info"
  }
});