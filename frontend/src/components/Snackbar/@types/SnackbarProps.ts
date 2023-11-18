import { VariantProps } from "tailwind-variants";
import { snackbar } from "../variants";

export type SnackbarProps  = VariantProps<typeof snackbar> &{
  message: string,
  type?: keyof typeof snackbar.variants.type | undefined;
}