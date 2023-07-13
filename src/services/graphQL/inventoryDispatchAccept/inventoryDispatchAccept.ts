import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';

const InventoryDispatchAccept = async (
  id: number,
  userId: number,
): Promise<GraphQLResponse['data']['basicInventoryDispatch_Accept']> => {
  const response = await GraphQL.fetch(`mutation {
    basicInventoryDispatch_Accept(
        dispatch_id: ${id}, 
        target_user_id: ${userId}) {
            message
            status
    }
  }`);

  return response?.data?.basicInventoryDispatch_Accept || {};
};

export default InventoryDispatchAccept;
