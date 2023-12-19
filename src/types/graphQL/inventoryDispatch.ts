import {DropdownDataNumber} from '../dropdownData';
import {InventoryTypeEnum} from '../inventoryType';

export interface InventoryDispatch {
  date_of_deactivation: string;
  deactivation_file: any;
  deactivation_description: string;
  id: number;
  type: DispatchType | `${DispatchType}`;
  source_user_profile: DropdownDataNumber;
  target_user_profiles: DropdownDataNumber;
  target_organization_unit: DropdownDataNumber;
  source_organization_unit: DropdownDataNumber;
  inventory_type?: string;
  office?: DropdownDataNumber;
  is_accepted: boolean;
  serial_number: string;
  dispatch_description: string;
  created_at: string;
  updated_at: string;
  date?: string;
  city?: string;
  inventory: {
    id: number;
    type: InventoryTypeEnum | `${InventoryTypeEnum}`;
    inventory_number: string;
    title: string;
    gross_price: number;
  }[];
  file: {
    id: number;
    name: string;
    type: string;
  };
}

export interface InventoryDispatchData {
  source_user_profile_id: number;
  target_user_profile_id: number;
  source_organization_unit_id: number;
  target_organization_unit_id: number;
  office_id: number;
  serial_number: string;
  dispatch_description: string;
  inventory_id: number[];
  type: DispatchType | `${DispatchType}`;
  date?: string;
  file_id?: number;
}

export enum DispatchType {
  allocation = 'allocation',
  return = 'return',
  revers = 'revers',
  returnRevers = 'return-revers',
}

export const DispatchTypeTitles = {
  [DispatchType.revers]: 'Eksterni revers',
  [DispatchType.returnRevers]: 'Povrat sredstva',
  [DispatchType.allocation]: 'Interni revers',
  [DispatchType.return]: 'Razduženje ',
};

export interface InventoryDispatchOverviewParams {
  page: number;
  size: number;
  type?: string | null;
  source_organization_unit_id?: number;
  accepted?: boolean | null;
  id: number;
}
