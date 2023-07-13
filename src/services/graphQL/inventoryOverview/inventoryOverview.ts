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
  const response = await GraphQL.fetch(`query {
    basicInventory_Overview(
        page: ${page}, 
        size: ${size}, 
        id: ${id}, 
        type: "${type}",
        source_type: "${source_type}",
        class_type_id: ${class_type_id}, 
        office_id: ${office_id}, 
        search: "${search}",
        depreciation_type_id: ${depreciation_type_id}
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
  }`);

  return response?.data?.basicInventory_Overview || {};
};

export default inventoryOverview;
