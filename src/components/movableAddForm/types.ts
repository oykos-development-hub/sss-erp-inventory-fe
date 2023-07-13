import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';

export interface MovableAddFormProps {
  office: DropdownDataNumber | null;
  order_list: DropdownDataString | null;
  invoice_number: string;
  supplier: DropdownDataNumber | null;
  date_of_purchase: Date | string;
  source: DropdownDataString | null;
}
