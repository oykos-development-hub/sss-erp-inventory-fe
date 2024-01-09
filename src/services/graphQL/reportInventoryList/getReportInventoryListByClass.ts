const getReportInventoryListByClass = `query ReportValueClassInventoryPDF($organization_unit_id: Int, $class_type_id: Int) {
    ReportValueClassInventory_PDF(organization_unit_id: $organization_unit_id, class_type_id: $class_type_id) {
        status 
        message
        item {
            values {
                id
                title
                class
                purchase_gross_price
                lost_value
                price
            }
            purchase_gross_price
            lost_value
            price
        }
    }
}`;

export default getReportInventoryListByClass;
