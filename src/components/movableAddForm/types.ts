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
  all_items?: boolean;
  type?: DropdownDataNumber;
  contract_id?: string;
  contract_article_id?: number;
  donor?: DropdownDataNumber;
  donation_description: string;
  donation_files: {
    name: string;
    type: string;
    id: number;
  }[];
  is_external_donation: DropdownDataString;
  invoice_id: number;
  invoice_article_id?: number;
}

export const VisibilityType = {
  None: 0,
  Accounting: 2,
  Inventory: 3,
};
