const InventoryDispatchOverview = `query BasicInventoryDispatchOverview($page: Int, $size: Int, $id: Int, $type: String, $inventory_type: String, $source_organization_unit_id: Int, $accepted: Boolean) {
  basicInventoryDispatch_Overview(page: $page, size: $size, id: $id, type: $type, inventory_type: $inventory_type, source_organization_unit_id: $source_organization_unit_id, accepted: $accepted) {
      status 
      message
      total
      items {
          id
          type
          source_user_profile {
              id
              title
          }
          target_user_profile {
              id
              title
          }
          source_organization_unit {
              id
              title
          }
          target_organization_unit {
              id
              title
          }
          office {
              id
              title 
          }
          is_accepted
          serial_number
          dispatch_description
          inventory_type
          inventory {
              id
              type
              inventory_number
              title
              gross_price
              serial_number
              location
          }
          created_at
          updated_at
          file_id
      }
  }
}`;

export default InventoryDispatchOverview;
