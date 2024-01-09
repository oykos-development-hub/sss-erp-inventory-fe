export type ReportInventoryItem = {
  id: number;
  title: string;
  inventory_number: string;
  office: string;
  procurement_price: string;
  lost_value: number;
  price: string;
};

export type ReportInventoryClass = {
  class: string;
  id: number;
  lost_value: number;
  price: number;
  purchase_gross_price: number;
  title: string;
};

export type ReportInventoryClassResponse = {
  status: number;
  message: string;
  item: {
    lost_value: number;
    price: number;
    purchase_gross_price: number;
    values: ReportInventoryClass[];
  };
};
