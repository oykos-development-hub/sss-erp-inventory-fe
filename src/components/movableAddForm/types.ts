import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {OrderListArticleType} from '../../types/graphQL/orderListTypes';

export interface MovableAddFormProps {
  office: DropdownDataNumber | null;
  contract: DropdownDataNumber | null;
  invoice_number: string;
  supplier: DropdownDataNumber | null;
  date_of_purchase: Date;
  date_of_contract_signing: Date;
  date_of_conclusion: Date;
  source: DropdownDataString | null;
  articles: OrderListArticleType;
}
