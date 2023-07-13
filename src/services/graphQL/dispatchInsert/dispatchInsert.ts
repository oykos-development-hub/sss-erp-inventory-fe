import {GraphQL} from '..';
import {InventoryDispatchData} from '../../../types/graphQL/inventoryDispatch';
import {GraphQLResponse} from '../../../types/graphQL/response';

const dispatchInsert = async (
  data: InventoryDispatchData,
): Promise<GraphQLResponse['data']['basicInventoryDispatch_Insert']> => {
  const response = await GraphQL.fetch(`mutation {
   basicInventoryDispatch_Insert(data: {
      source_user_profile_id: ${data.source_user_profile_id},
      target_user_profile_id: ${data.target_user_profile_id},
      source_organization_unit_id: ${data.source_organization_unit_id},
      target_organization_unit_id: ${data.target_organization_unit_id},
      office_id: ${data.office_id},
      serial_number: "${data.serial_number}",
      dispatch_description: "${data.dispatch_description}",
      inventory_id: [${data.inventory_id}],
      type: "${data.type}",
   }) {
        status 
        message 
        item {
            id
            source_user_profile {
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
            target_organization_unit {
                id
                title
            }
            office {
                id
                title 
            }
            is_accepted
            dispatch_description
            created_at
            updated_at
            file_id
        }
    }
  }`);

  return response?.data?.basicInventoryDispatch_Insert || {};
};

export default dispatchInsert;
