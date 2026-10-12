import { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "outline" | "outline-purple" | "dark";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-purple text-white shadow-[0_10px_30px_rgba(106,27,154,0.4)] hover:bg-brand-purple-dark",
  secondary: "bg-white text-brand-purple hover:bg-[#E9DEF5]",
  outline: "border border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.14]",
  "outline-purple":
    "border border-brand-purple-border text-brand-purple hover:bg-brand-purple-hover",
  dark: "bg-brand-black text-white hover:bg-brand-purple",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center rounded-full px-[26px] py-[15px] text-[16px] font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
    />
  );
}
