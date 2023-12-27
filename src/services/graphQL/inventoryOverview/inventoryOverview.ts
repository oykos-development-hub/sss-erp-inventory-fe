const inventoryOverview = `query BasicInventoryOverview(
    $page: Int, 
    $size: Int, 
    $organization_unit_id: Int,
    $id: Int, 
    $type: String,
    $status: String,
    $class_type_id: Int,
    $office_id: Int,  
    $search: String,
    $source_type: String,
    $depreciation_type_id: Int,
    $expire: Boolean,
    $type_of_immovable_property: String
    $is_external_donation: Boolean
    ) {
    basicInventory_Overview(
        page: $page, 
        size: $size,
        organization_unit_id: $organization_unit_id, 
        id: $id, 
        type: $type,
        status: $status,
        class_type_id: $class_type_id, 
        office_id: $office_id, 
        search: $search,
        source_type: $source_type,
        depreciation_type_id: $depreciation_type_id,
        expire: $expire,
        type_of_immovable_property: $type_of_immovable_property,
        is_external_donation: $is_external_donation
        ) {
        status 
        message
        total 
        items {
            id
            purchase_gross_price
            type
            source_type
            location
            invoice {
                id
                title
            }
            class_type {
                id
                title
            }
            depreciation_type {
                id
                title
            }
            real_estate {
                id
                type_id
                square_area
                land_serial_number
                estate_serial_number
                ownership_type
                ownership_scope
                ownership_investment_scope
                limitations_description
                property_document
                limitation_id
                document
                file_id
            }
            inventory_number
            title
            office {
                id
                title
            }
            target_user_profile {
                id
                title
            }
            organization_unit{
                id
                title
            }
            target_organization_unit{
                id
                title
            }
            gross_price
            date_of_purchase
            date_of_assessments
            date_of_end_of_assessment 
            source
            active
            status
            is_external_donation
        }
    }
}`;

export default inventoryOverview;
