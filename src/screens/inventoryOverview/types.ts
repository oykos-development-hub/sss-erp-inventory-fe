import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export enum InventoryFiltersEnum {
  TYPE = 'type',
  CLASS = 'class',
  LOCATION = 'location',
  SEARCH = 'search',
  AMORTIZATION_GROUP = 'amortization_group',
}

export interface InventoryFilters {
  office_id: DropdownDataNumber | null;
  search: string;
  source_type?: DropdownDataString | null;
  depreciation_type_id?: DropdownDataNumber | null;
  class_type_id?: DropdownDataNumber | null;
}
