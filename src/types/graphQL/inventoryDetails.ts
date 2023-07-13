import {DropdownDataNumber} from '../dropdownData';
import {SourceType} from './inventoryOverview';
import {RealEstate} from './realEstateOverview';

export interface InventoryDetails {
  id: number;
  article_id: number;
  type: string;
  class_type: DropdownDataNumber;
  depreciation_type: DropdownDataNumber;
  supplier: DropdownDataNumber;
  real_estate?: RealEstate;
  serial_number: string;
  inventory_number: string;
  title: string;
  abbreviation: string;
  internal_ownership: string;
  office: DropdownDataNumber;
  location: number;
  target_user_profile: DropdownDataNumber;
  unit: string;
  amount: number;
  net_price: number;
  gross_price: number;
  description: string;
  date_of_purchase: string;
  source: string;
  donor_title: string;
  invoice_number: string;
  price_of_assessment: number;
  date_of_assessment: number;
  lifetime_of_assessment_in_months: number;
  active: boolean;
  source_type: SourceType | `${SourceType}`;
  deactivation_description: string;
  assessments?: {
    id: number;
    inventory_id: number;
    active: boolean;
    depreciation_type: DropdownDataNumber;
    user_profile: DropdownDataNumber;
    gross_price_new: number;
    gross_price_difference: number;
    date_of_assessment: string;
  }[];
  movements?: {
    id: number;
    source_user_profile: DropdownDataNumber;
    target_user_profile: DropdownDataNumber;
    target_organization_unit: DropdownDataNumber;
    is_accepted: boolean;
    serial_number: string;
    dispatch_description: string;
  }[];
  created_at: string;
  updated_at: string;
  invoice_file_id: string;
  file_id: string;
}
