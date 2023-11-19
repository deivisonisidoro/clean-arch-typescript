import { VariantProps } from "tailwind-variants";
import { loadingVariants } from "../loadingVariants";

export type LoadingProps = VariantProps<typeof loadingVariants> & {
  size?: keyof typeof loadingVariants.variants.size | undefined;
};