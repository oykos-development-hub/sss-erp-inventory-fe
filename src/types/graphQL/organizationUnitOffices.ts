import {DropdownDataNumber} from '../dropdownData';

export interface Office {
  id: number;
  title: string;
  organization_unit: DropdownDataNumber;
  abbreviation: string;
  description: string;
  color: string;
  icon: string;
}

export interface OfficeParams {
  page: number;
  size: number;
  id: number;
}
