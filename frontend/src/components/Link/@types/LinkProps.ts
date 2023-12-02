import { VariantProps } from "tailwind-variants";
import { linkVariants } from "../variants";

export type LinkPropsTypes =  VariantProps<typeof linkVariants> & {
  route: string;
  label: string;
  color?: keyof typeof linkVariants.variants.color | undefined;
}