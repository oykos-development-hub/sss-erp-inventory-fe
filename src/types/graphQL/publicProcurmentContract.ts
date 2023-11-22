import {DropdownDataNumber} from '../dropdownData';

export interface PublicProcurementContracts {
  id: number;
  public_procurement: DropdownDataNumber;
  supplier: DropdownDataNumber;
  serial_number: string;
  date_of_signing: string;
  date_of_expiry: string;
  net_value: number;
  gross_value: number;
  vat_value: number;
  created_at: string;
  updated_at: string;
  amount: number;
  used_articles: number;
  public_procurement_article: DropdownDataNumber;
  file: {
    id: number;
    name: string;
    type: string;
  }[];
}
