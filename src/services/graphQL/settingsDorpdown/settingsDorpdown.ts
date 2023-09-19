import {GraphQL} from '..';
import {SettingsDropdownOverviewResponse} from '../../../types/graphQL/classTypes';

const getSettingsDropdownOverview = async (
  search?: string,
  id?: number,
  entity?: string,
): Promise<SettingsDropdownOverviewResponse['data']['settingsDropdown_Overview']> => {
  const query = `query SettingsDropdownOverview($search: String, $id: Int, $entity: String!, $page: Int, $size: Int) {
    settingsDropdown_Overview(search: $search, page: $page, size: $size, id: $id, entity: $entity) {
        status 
        message
        total
        items {
            id
            title
            entity
            value
            description
            abbreviation
            color
            icon
        }
    }
}`;

  const response = await GraphQL.fetch(query, {search, id, entity});

  return response?.data?.settingsDropdown_Overview || {};
};

export default getSettingsDropdownOverview;
