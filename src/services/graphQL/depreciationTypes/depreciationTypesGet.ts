import {GraphQL} from '..';
import {DepreciationTypesParams} from '../../../types/graphQL/depreciationTypes';
import {GraphQLResponse} from '../../../types/graphQL/response';

const depreciationTypesGet = async ({
  page,
  size,
  id = 0,
}: DepreciationTypesParams): Promise<GraphQLResponse['data']['basicInventoryDepreciationTypes_Overview']> => {
  const response = await GraphQL.fetch(`query {
    basicInventoryDepreciationTypes_Overview(page: ${page}, size: ${size}, id: ${id}) {
        status 
        message
        total 
        items {
            id
            title
            abbreviation
            lifetime_in_months
            description
            color
            icon
        }
    }
  }`);

  return response?.data?.basicInventoryDepreciationTypes_Overview || {};
};

export default depreciationTypesGet;
