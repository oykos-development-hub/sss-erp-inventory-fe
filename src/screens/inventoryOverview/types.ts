import {DropdownDataBoolean, DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export enum InventoryFiltersEnum {
  TYPE = 'type',
  CLASS = 'class',
  LOCATION = 'location',
  SEARCH = 'search',
  STATUS = 'status',
  AMORTIZATION_GROUP = 'amortization_group',
  EXPIRE = 'expire',
  ORGANIZATION_UNIT = 'organization_unit',
  TYPE_OF_IMMOVABLE_PROPERTY = 'type_of_immovable_property',
}

export interface InventoryFilters {
  office_id: DropdownDataNumber | null;
  search: string;
  source_type?: DropdownDataString | null;
  depreciation_type_id?: DropdownDataNumber | null;
  class_type_id?: DropdownDataNumber | null;
  status?: DropdownDataString | null;
  expire?: DropdownDataBoolean | null;
  organization_unit_id?: DropdownDataNumber | null;
  type_of_immovable_property?: DropdownDataString | null;
}
