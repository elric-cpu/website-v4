import { useMemo } from "react";
import { getOregonDefaults } from "@/lib/zipLocalization/zipLocalization";

export const useZipLocalization = (zip) =>
  useMemo(() => getOregonDefaults(zip), [zip]);
