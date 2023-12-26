const inventoryInsert = `mutation($data: [BasicInventoryInsertMutation!]) {
    basicInventory_Insert(data: $data) {
        status 
        message
        validator {
            entity
            value
        } 
        items {
            id
            article_id
            type
            donation_description
            donation_files {
              id
              name
              type
            }
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
            supplier {
                id
                title
            }
            real_estate {
                id
                square_area
                land_serial_number
                estate_serial_number
                ownership_type
                ownership_scope
                ownership_investment_scope
                limitations_description
                file_id
            }
            serial_number
            inventory_number
            title
            abbreviation
            internal_ownership
            office {
                id
                title
            }
            location
            target_user_profile {
                id
                title
            }
            unit
            amount
            net_price
            gross_price
            description
            date_of_purchase
            source
            source_type
            donor_title
            invoice_number
            price_of_assessment
            date_of_assessment
            lifetime_of_assessment_in_months
            active
            deactivation_description
            created_at
            updated_at
            invoice_file_id
            file_id
        }
    }
}`;

export default inventoryInsert;
