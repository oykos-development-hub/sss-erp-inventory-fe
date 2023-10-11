import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {OrderListArticleType} from '../../types/graphQL/orderListTypes';

export interface MovableAddFormProps {
  office: DropdownDataNumber | null;
  order_list: DropdownDataNumber | null;
  invoice_number: string;
  supplier: DropdownDataNumber | null;
  date_of_purchase: Date | string;
  source: DropdownDataString | null;
  articles: OrderListArticleType[];
}
