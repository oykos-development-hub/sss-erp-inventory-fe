export interface ClassInventoriesValueItem {
  id: number;
  title: string;
  class: string;
  purchase_gross_price: number;
  lost_value: number;
  price: number;
}

export interface ClassInventoriesValueResponse {
  values: ClassInventoriesValueItem[];
  purchase_gross_price: number;
  lost_value: number;
  price: number;
}
