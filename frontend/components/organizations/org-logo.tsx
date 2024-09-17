"use client";

import { components } from "@/lib/battle-stadium-api";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";

export interface OrgLogoProps {
  organization?: components["schemas"]["Organization"];
  className?: string;
}
export default function OrgLogo ({
  organization, className
}: OrgLogoProps) {
  return (
  <motion.div
    initial={ { opacity: 0 } }
    animate={ { opacity: 1 } }
    transition={ { duration: 2 } }
  >
    <Image
      alt={ organization?.name }
      aria-label={ organization?.name }
      className={ `aspect-square gap-3 h-[100px] w-[100px] md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px] ${className}` }
      src={ organization?.logo_url ?? "/pokemon/vgc.png" }
    />
  </motion.div>
);
}
