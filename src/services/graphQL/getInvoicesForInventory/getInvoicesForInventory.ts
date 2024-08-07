const getInvoicesForInventory = `query invoicesForInventory_Overview( $organization_unit_id: Int, $supplier_id: Int) {
    invoicesForInventory_Overview(organization_unit_id: $organization_unit_id, supplier_id: $supplier_id) {
        status
        message 
        items {
            id
            invoice_number
            date_of_invoice
            articles{
                id
                title
                net_price
                amount
            }
        }
    }
}`;

export default getInvoicesForInventory;
