import {GraphQL} from '..';
import {ClassTypesParams} from '../../../types/graphQL/classTypes';
import {GraphQLResponse} from '../../../types/graphQL/response';

const classTypesGet = async ({
  search = '',
  id = 0,
}: ClassTypesParams): Promise<GraphQLResponse['data']['settingsDropdown_Overview']> => {
  const response = await GraphQL.fetch(`query {
    settingsDropdown_Overview(search: "${search}", id: ${id}, entity: "inventory_class_type") {
        status 
        message
        items {
            id
            title
            abbreviation
            color
            icon
        }
    }
  }`);

  return response?.data?.settingsDropdown_Overview || {};
};

export default classTypesGet;
