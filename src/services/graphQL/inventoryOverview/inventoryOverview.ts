import {GraphQL} from '..';
import {InventoryOverviewParams} from '../../../types/graphQL/inventoryOverview';
import {GraphQLResponse} from '../../../types/graphQL/response';

const inventoryOverview = async ({
  page,
  size,
  id = 0,
  type,
  source_type,
  class_type_id = 0,
  office_id = 0,
  search = '',
  depreciation_type_id = 0,
}: InventoryOverviewParams): Promise<GraphQLResponse['data']['basicInventory_Overview']> => {
  const query = `
    query BasicInventoryOverview(
        $page: Int, 
        $size: Int, 
        $organization_unit_id: Int,
        $id: Int, 
        $type: String,
        $class_type_id: Int,
        $office_id: Int,  
        $search: String,
        $source_type: String,
        $depreciation_type_id: Int
        ) {
        basicInventory_Overview(
            page: $page, 
            size: $size,
            organization_unit_id: $organization_unit_id, 
            id: $id, 
            type: $type,
            class_type_id: $class_type_id, 
            office_id: $office_id, 
            search: $search,
            source_type: $source_type,
            depreciation_type_id: $depreciation_type_id
            ) {
            status 
            message
            total 
            items {
                id
                type
                source_type
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
                source
                active
            }
        }
    }`;
  const response = await GraphQL.fetch(query, {
    page,
    size,
    id,
    type,
    source_type,
    class_type_id,
    office_id,
    search,
    depreciation_type_id,
  });

  return response?.data?.basicInventory_Overview || {};
};

export default inventoryOverview;
