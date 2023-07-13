import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {UserProfileParams} from '../../../types/graphQL/userProfileOverview';

const userProfileOverview = async ({
  page,
  size,
  id = 0,
  is_active = true,
  organization_unit_id = 0,
  job_position_id = 0,
  name = '',
}: UserProfileParams): Promise<{data: GraphQLResponse['data']['userProfiles_Overview']}> => {
  const response = await GraphQL.fetch(`query {
    userProfiles_Overview(page: ${page}, size: ${size}, id: ${id}, is_active: ${is_active}, organization_unit_id: ${organization_unit_id}, job_position_id: ${job_position_id}, name: "${name}") {
        message
        status
        total
        items {
            id
            first_name
            last_name
            date_of_birth
            email
            phone
            active
            is_judge
            is_judge_president
            role
            organization_unit
            job_position
            created_at
            updated_at
        }
    }
}`);

  return response?.data?.userProfiles_Overview || {};
};

export default userProfileOverview;
