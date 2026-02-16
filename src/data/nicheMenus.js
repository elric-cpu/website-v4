import { PRICING_NOTES } from "./nicheMenus/base";
import { residentialMaintenanceMenu } from "./nicheMenus/residentialMaintenance";
import { moistureEnvelopeMenu } from "./nicheMenus/moistureEnvelope";
import { agingInPlaceMenu } from "./nicheMenus/agingInPlace";
import { insuranceAdjacentMenu } from "./nicheMenus/insuranceAdjacent";
import { commercialMaintenanceMenu } from "./nicheMenus/commercialMaintenance";
import { energyComfortMenu } from "./nicheMenus/energyComfort";

export { PRICING_NOTES };

export const NICHE_MENUS = {
  residential_maintenance: residentialMaintenanceMenu,
  moisture_envelope: moistureEnvelopeMenu,
  aging_in_place: agingInPlaceMenu,
  insurance_adjacent: insuranceAdjacentMenu,
  commercial_maintenance: commercialMaintenanceMenu,
  energy_comfort: energyComfortMenu,
};
