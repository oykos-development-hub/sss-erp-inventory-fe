import {DropdownDataNumber} from '../../types/dropdownData';

export interface MovableDetailsFormProps {
  inventoryId: number;
  inventoryType: string;
  class_type: DropdownDataNumber | null;
  depreciation_type: DropdownDataNumber | null;
  supplier_id: number;
  supplier: DropdownDataNumber | null;
  serial_number: string;
  inventory_number: string;
  title: string;
  abbreviation: string;
  internal_ownership: boolean;
  office: DropdownDataNumber | null;
  location: string;
  target_user_profile_id: number;
  unit: string;
  amount: number;
  net_price: number;
  purchase_gross_price?: number;
  gross_price: number;
  description: string;
  date_of_purchase: string;
  source: string;
  donor_title: string;
  invoice_number: number;
  price_of_assessment: number;
  date_of_assessment: string;
  lifetime_of_assessment_in_months: number;
  depreciation_rate?: string;
  amortization_value?: number;
  active: boolean;
  deactivation_description: number;
  invoice_file_id: string;
  file_id?: number;
  land_serial_number: string;
}
