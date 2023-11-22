import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {OrderListArticleType} from '../../types/graphQL/orderListTypes';

export interface MovableAddFormProps {
  office?: DropdownDataNumber;
  contract?: DropdownDataNumber;
  invoice_number: string;
  supplier?: DropdownDataNumber;
  date_of_purchase?: Date;
  date_of_contract_signing?: Date;
  date_of_conclusion?: Date;
  source?: DropdownDataString;
  articles?: OrderListArticleType;
}

export const VisibilityType = {
  None: 0,
  Accounting: 2,
  Inventory: 3
};