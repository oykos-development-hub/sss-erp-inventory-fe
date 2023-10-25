import {DropdownDataNumber, DropdownDataString} from '../dropdownData';
import {SimpleResponse, OverviewResponse} from './response';

export interface OrderListItem {
  id: number;
  date_order?: string;
  total_price?: number;
  total_neto: number;
  public_procurement?: DropdownDataString;
  supplier?: DropdownDataNumber;
  status?: string;
  articles?: OrderListArticleType[];
  invoice_date?: string;
  invoice_number: string;
  date_system?: string;
  description?: string;
  recipient_user?: DropdownDataString;
  office?: DropdownDataString;
}

export interface OrderListArticleType {
  id: number;
  title: string;
  description: string;
  manufacturer: string;
  unit: string;
  amount: number;
  total_price: number;
  available?: number;
}

export interface GetOrderListParams {
  page?: number;
  size?: number;
  id?: number;
  supplier_id?: number;
  status?: string;
  search?: string;
}

export interface OrderListType {
  delete: {
    orderList_Delete: SimpleResponse;
  };
  get: {
    orderList_Overview: OverviewResponse<OrderListItem>;
  };
}
