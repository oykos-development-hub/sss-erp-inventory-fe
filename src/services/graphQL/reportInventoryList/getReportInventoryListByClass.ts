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
                gross_price
                price_of_assessment
            }
            purchase_gross_price
            gross_price
            price_of_assessment
        }
    }
}`;

export default getReportInventoryListByClass;
