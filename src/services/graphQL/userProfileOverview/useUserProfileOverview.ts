import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {EmployeeListFilters, UserProfile} from '../../../types/graphQL/userProfileOverview';
import {PaginationProps} from '../../../types/paginationParams';
import {MicroserviceProps} from '../../../types/micro-service-props';

const initialState = {items: [], total: 0, message: '', status: ''};

interface UserProfileHookParams extends EmployeeListFilters, PaginationProps {
  id?: number;
  name?: string;
  context: MicroserviceProps;
}

const useUserProfiles = ({
  page,
  size,
  id,
  is_active,
  job_position_id,
  organization_unit_id,
  name,
  context,
}: UserProfileHookParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['userProfiles_Overview']>(initialState);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);

  const fetchEmployees = async () => {
    const userProfiles: any = await context.fetch(GraphQL.userProfileOverview, {
      page,
      size,
      id,
      is_active: is_active ? is_active.id : true,
      job_position_id,
      organization_unit_id,
      name,
    });

    const options = userProfiles?.userProfiles_Overview?.items.map((item: UserProfile) => ({
      id: item.id,
      title: `${item.first_name} ${item.last_name}`,
    }));

    setOptions(options);

    setData(userProfiles?.userProfiles_Overview);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, size, id, is_active, job_position_id, organization_unit_id, name]);

  return {data, loading, refetch: fetchEmployees, options};
};

export default useUserProfiles;
