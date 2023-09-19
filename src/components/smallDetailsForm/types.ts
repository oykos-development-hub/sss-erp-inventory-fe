import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {RealEstate} from '../../types/graphQL/realEstateOverview';

export interface SmallDetailsFormProps {
  inventoryId?: number;
  inventoryType: string;
  class_type_id: number;
  class_type?: DropdownDataNumber | null;
  depreciation_type_id: 1;
  depreciation_type?: DropdownDataNumber | null;
  supplier_id: number;
  supplier?: DropdownDataNumber | null;
  real_estate: RealEstate | null;
  serial_number: string;
  inventory_number: string;
  title: string;
  abbreviation: string;
  internal_ownership: true;
  office_id: number;
  office?: DropdownDataNumber | null;
  source: DropdownDataString | null;
  donor_title: string;
  invoice_number: string;
  date_of_purchase: string;
  gross_price: number;
  amount: number;
  description: string;
  location: DropdownDataString | null;
  target_user_profile_id: number;
  net_price: number;
  square_area: number;
  land_serial_number: string;
  ownership_documents: string;
  ownership_scope: string;
  ownership_investment_scope: string;
  property_document: string;
  limitations_description: string;
  lifetime_of_assessment_in_months: number;
  file_id: number;
  document: string;
  unit: DropdownDataString | null;
}
