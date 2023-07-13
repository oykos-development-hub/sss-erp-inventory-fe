import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';

const inventoryDispatchDelete = async (
  id: number,
): Promise<GraphQLResponse['data']['basicInventoryDispatch_Delete']> => {
  const response = await GraphQL.fetch(`mutation {
    basicInventoryDispatch_Delete(id: ${id}) {
        message
        status
    }
  }`);

  return response?.data?.basicInventoryDispatch_Delete || {};
};

export default inventoryDispatchDelete;
