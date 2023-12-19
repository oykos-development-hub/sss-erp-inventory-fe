import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export interface SmallInventoryAddFormProps {
  invoice_number: string;
  date_of_purchase?: Date;
  source: DropdownDataString | null;
  supplier: DropdownDataNumber | null;
  office: DropdownDataNumber | null;
  items: any[];
}
