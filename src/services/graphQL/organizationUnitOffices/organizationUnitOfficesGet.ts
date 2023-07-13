import {GraphQL} from '..';
import {OfficeParams} from '../../../types/graphQL/organizationUnitOffices';
import {GraphQLResponse} from '../../../types/graphQL/response';

const organizationUnitOfficesGet = async ({
  page,
  size,
  id = 0,
}: OfficeParams): Promise<GraphQLResponse['data']['officesOfOrganizationUnits_Overview']> => {
  const response = await GraphQL.fetch(`query {
    officesOfOrganizationUnits_Overview(page: ${page}, size: ${size}, id: ${id}) {
        status 
        message
        total 
        items {
            id
            title
            organization_unit {
                id
                title
            }
            abbreviation
            description
            color
            icon
        }
    }
  }`);

  return response?.data?.officesOfOrganizationUnits_Overview || {};
};

export default organizationUnitOfficesGet;
