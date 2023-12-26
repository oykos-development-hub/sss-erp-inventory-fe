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
  property_document: DropdownDataString | null;
  limitation: DropdownDataBoolean | null;
  limitation_id: boolean;
  document: string;
  is_external_donation: DropdownDataBoolean | null;
  owner: string;
}
