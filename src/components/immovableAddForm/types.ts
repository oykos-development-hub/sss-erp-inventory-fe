import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export interface ImmovableAddFormProps {
  gross_price: string;
  location: string;
  land_serial_number: string;
  square_area: string;
  ownership_scope: DropdownDataString | null;
  ownership_investment_scope: string;
  limitations_description: string;
  depreciation_type: DropdownDataNumber | null;
  type: DropdownDataString | null;
  property_document: string;
  limitation: DropdownDataString | null;
  limitation_id: string;
  document: string;
}
