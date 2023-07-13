import {InventoryTypeEnum} from '../inventoryType';
import {RealEstate} from './realEstateOverview';

export interface InventoryInsertData {
  id: number;
  type: InventoryTypeEnum | `${InventoryTypeEnum}`;
  class_type_id: number;
  depreciation_type_id: number;
  supplier_id: number;
  real_estate: RealEstate | null;
  serial_number: string;
  inventory_number: string;
  title: string;
  abbreviation: string;
  internal_ownership: boolean;
  office_id: number;
  location: string;
  target_user_profile_id: number;
  unit: string;
  amount: number;
  net_price: number;
  gross_price: number;
  description: string;
  date_of_purchase: string;
  source: string;
  donor_title: string;
  invoice_number: number;
  price_of_assessment: number;
  date_of_assessment: string;
  lifetime_of_assessment_in_months: number;
  active: boolean;
  deactivation_description: number;
  invoice_file_id: string | undefined;
  file_id: string;
}
