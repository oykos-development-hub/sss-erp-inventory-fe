export interface InvoiceForInventory {
  id: number;
  invoice_number: string;
  date_of_invoice: string;
  articles: Article[];
}

type Article = {
  id: number;
  title: string;
  net_price: number;
  amount: number;
};
