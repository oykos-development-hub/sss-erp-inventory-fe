const realEstateGet = `query InventoryRealEstatesOverview($page: Int, $size: Int, $id: Int) {
  basicInventoryRealEstates_Overview(page: $page, size: $size, id: $id) {
      status 
      message
      total 
      items {
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
  }
}`;

export default realEstateGet;
