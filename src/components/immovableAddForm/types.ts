import {DropdownDataBoolean, DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export interface ImmovableAddFormProps {
  gross_price: number;
  location: string;
  land_serial_number: string;
  square_area: number;
  ownership_scope?: string;
  ownership_investment_scope: string;
  limitations_description: string;
  depreciation_type: DropdownDataNumber | null;
  type: DropdownDataString | null;
  property_document: string;
  limitation: DropdownDataBoolean | null;
  limitation_id: boolean;
  document: string;
}
