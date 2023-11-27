import {DropdownDataNumber} from '../dropdownData';

export interface PublicProcurementContractArticles {
  id: number;
  public_procurement_article: {
    id: number;
    title: string;
    vat_percentage: string;
    description: string;
  };
  contract: DropdownDataNumber;
  amount: number;
  used_articles: number;
  overage_total: number;
  net_value: string;
  gross_value: number;
}
