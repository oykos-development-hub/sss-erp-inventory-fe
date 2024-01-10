const getReportInventoryList = `query ReportInventoryList($date: String!, $organization_unit_id: Int!, $source_type: String, $type: String, $office_id: Int) {
    reportInventoryList_PDF(date: $date, organization_unit_id: $organization_unit_id, source_type: $source_type, type: $type, office_id: $office_id) {
        status 
        message
        item {
            id
            title
            type
            inventory_number
            office
            date_of_purchase
            procurement_price
            lost_value
            price
        }
    }
}`;

export default getReportInventoryList;
