import { VariantProps } from "tailwind-variants";
import { loading } from "../variants";

export type LoadingProps = VariantProps<typeof loading> & {
  size?: keyof typeof loading.variants.size | undefined;
};