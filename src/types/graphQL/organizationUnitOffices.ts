import {DropdownDataNumber} from '../dropdownData';
import {MicroserviceProps} from '../micro-service-props';

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
  context: MicroserviceProps;
  page: number;
  size: number;
  id: number;
}
