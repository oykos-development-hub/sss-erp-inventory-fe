import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export interface SmallInventoryAddFormProps {
  invoice_number: string;
  date_of_purchase: Date | string;
  source: DropdownDataString | null;
  supplier: DropdownDataNumber | null;
  office: DropdownDataNumber | null;
}
