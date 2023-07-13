import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';

const organizationUnitsGet = async (): Promise<GraphQLResponse['data']['organizationUnits']> => {
  const queryIdentifier = 'organizationUnits';
  const response = await GraphQL.fetch(`
        query {
          ${queryIdentifier} {
              message
              status
              items {
                  id,
                  parent_id,
                  number_of_judges,
                  title,
                  abbreviation,
                  color,
                  icon,
                  folder_id
              }
          }
        }
    `);

  return response?.data[queryIdentifier] || {};
};

export default organizationUnitsGet;
