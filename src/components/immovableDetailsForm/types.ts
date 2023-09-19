import {DropdownDataString, DropdownDataNumber} from '../../types/dropdownData';

export interface ImmovableDetailsFormProps {
  inventoryId: number;
  class_type: DropdownDataNumber | null;
  class_type_id: number;
  depreciation_type: DropdownDataNumber | null;
  depreciation_type_id: number;
  office_id: number;
  supplier_id: number;
  serial_number: string;
  inventory_number: string;
  abbreviation: string;
  internal_ownership: boolean;
  office: DropdownDataNumber | null;
  location: DropdownDataString | null;
  target_user_profile_id: number;
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
  date_of_assessment: string;
  lifetime_of_assessment_in_months: number;
  active: boolean;
  deactivation_description: number;
  invoice_file_id: number;
  square_area: number;
  land_serial_number: string;
  estate_serial_number: string;
  ownership_type: DropdownDataString | null;
  ownership_scope: DropdownDataString | null;
  ownership_investment_scope: string;
  limitations_description: string;
  file_id: number;
  type: DropdownDataString | null;
  property_document: string;
  limitation: DropdownDataString | null;
  limitation_id: string;
  document: string;
  depreciation_rate: number;
}
