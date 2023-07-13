import {DropdownDataBoolean, DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export interface InventoryDispatchFilters {
  source_organization_unit?: DropdownDataNumber | null;
  accepted?: DropdownDataBoolean | null;
  type?: DropdownDataString | null;
}
