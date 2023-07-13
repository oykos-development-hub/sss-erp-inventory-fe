import {GraphQL} from '..';
import {RealEstateParams} from '../../../types/graphQL/realEstateOverview';
import {GraphQLResponse} from '../../../types/graphQL/response';

const realEstateGet = async ({
  page,
  size,
  id = 0,
}: RealEstateParams): Promise<GraphQLResponse['data']['basicInventoryRealEstates_Overview']> => {
  const response = await GraphQL.fetch(`query {
    basicInventoryRealEstates_Overview(page: ${page}, size: ${size}, id: ${id}) {
        status 
        message
        total 
        items {
            id
            title
            square_area
            land_serial_number
            estate_serial_number
            ownership_type
            ownership_scope
            ownership_investment_scope
            limitations_description
            file_id
            type_id 
            property_document
            limitation_id 
            document
        }
    }
  }`);

  return response?.data?.basicInventoryRealEstates_Overview || {};
};

export default realEstateGet;
