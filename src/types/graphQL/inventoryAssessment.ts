import {DropdownDataNumber} from '../dropdownData';

export interface InventoryAssessment {
  id: number;
  inventory_id: number;
  active: boolean;
  depreciation_type: DropdownDataNumber | null;
  user_profile_id: number;
  gross_price_new: number;
  gross_price_difference: number;
  date_of_assessment: string;
  created_at: string;
  updated_at: string;
  file_id: number;
}

export interface InventoryAssessmentData {
  inventory_id: number;
  active: boolean;
  depreciation_type_id: number;
  user_profile_id: number;
  gross_price_new: number;
  gross_price_difference: number;
  date_of_assessment: string;
}
