import {GraphQL} from '..';
import {InventoryDispatchOverviewParams} from '../../../types/graphQL/inventoryDispatch';
import {GraphQLResponse} from '../../../types/graphQL/response';

const InventoryDispatchOverview = async ({
  page,
  size,
  accepted,
  type = '',
  source_organization_unit_id = 0,
  id = 0,
}: InventoryDispatchOverviewParams): Promise<GraphQLResponse['data']['basicInventoryDispatch_Overview']> => {
  const response = await GraphQL.fetch(`query {
    basicInventoryDispatch_Overview(
        page: ${page}, 
        size: ${size},
        source_organization_unit_id: ${source_organization_unit_id},
        type: "${type}",
        accepted: "${accepted}",
        id: ${id}
        ) {
        status 
        message
        total 
        items {
            id
            source_user_profile {
                id
                title
            }
            target_user_profile {
                id
                title
            }
            target_organization_unit {
                id
                title
            }
            source_organization_unit {
              id
              title
            }
            type
            is_accepted
            serial_number
            dispatch_description
            created_at
            updated_at
            file_id
            inventory {
                id
                type
                inventory_number
                title
                gross_price
            }
        }
    }
  }`);

  return response?.data?.basicInventoryDispatch_Overview || {};
};

export default InventoryDispatchOverview;
