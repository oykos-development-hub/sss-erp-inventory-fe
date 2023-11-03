import {DropdownDataNumber} from '../dropdownData';
import {InventoryTypeEnum} from '../inventoryType';
import {MicroserviceProps} from '../micro-service-props';
import {RealEstate} from './realEstateOverview';

export interface InventoryItem {
  id: number;
  type: InventoryTypeEnum | `${InventoryTypeEnum}`;
  class_type: DropdownDataNumber;
  depreciation_type: DropdownDataNumber;
  real_estate: RealEstate;
  inventory_number: string;
  title: string;
  office: DropdownDataNumber;
  target_user_profile: DropdownDataNumber;
  gross_price: number;
  date_of_purchase: string;
  source: string;
  status: string;
  active: boolean;
  source_type: SourceType | `${SourceType}`;
  organization_unit: DropdownDataNumber;
  target_organization_unit: DropdownDataNumber;
}

export enum SourceType {
  PS1 = 'PS1',
  PS2 = 'PS2',
  NS1 = 'NS1',
  NS2 = 'NS2',
}

export interface InventoryOverviewParams {
  page?: number;
  size?: number;
  type?: InventoryTypeEnum | `${InventoryTypeEnum}`;
  source_type?: string;
  depreciation_type_id?: number;
  id?: number;
  class_type_id?: number;
  office_id?: number;
  search?: string;
  status?: string;
}

export interface InventoryInsertData {
  id?: number;
  type: InventoryTypeEnum | `${InventoryTypeEnum}`;
  class_type_id?: number;
  depreciation_type_id?: number;
  supplier_id?: number;
  real_estate?: RealEstate;
  serial_number?: string;
  inventory_number?: string;
  title?: string;
  abbreviation?: string;
  internal_ownership: boolean;
  office_id?: number;
  location?: string;
  target_user_profile_id?: number;
  target_organization_unit_id?: number;
  unit?: string;
  amount?: number;
  net_price?: number;
  purchase_gross_price?: number;
  gross_price: number;
  description?: string;
  date_of_purchase?: string;
  source?: string;
  donor_title?: string;
  invoice_number?: string;
  price_of_assessment?: number;
  date_of_assessment?: string;
  lifetime_of_assessment_in_months?: number;
  active: boolean;
  deactivation_description: number;
  invoice_file_id?: number;
  file_id?: number;
  organization_unit_id?: number;
}
