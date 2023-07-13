import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {EmployeeListFilters, UserProfile} from '../../../types/graphQL/userProfileOverview';
import {PaginationProps} from '../../../types/paginationParams';

const initialState = {items: [], total: 0, message: '', status: ''};

interface UserProfileHookParams extends EmployeeListFilters, PaginationProps {
  id?: number;
  name?: string;
}

const useUserProfiles = ({
  page,
  size,
  id,
  is_active,
  job_position_id,
  organization_unit_id,
  name,
}: UserProfileHookParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['userProfiles_Overview']>(initialState);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);

  const fetchEmployees = async () => {
    const userProfiles: any = await GraphQL.userProfileOverview({
      page,
      size,
      id: id ?? 0,
      is_active: is_active ? is_active.id : true,
      job_position_id: job_position_id ? job_position_id.id : 0,
      organization_unit_id: organization_unit_id ? organization_unit_id.id : 0,
      name: name ?? '',
    });

    const options = userProfiles.items.map((item: UserProfile) => ({
      id: item.id,
      title: `${item.first_name} ${item.last_name}`,
    }));

    setOptions(options);

    setData(userProfiles);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, size, id, is_active, job_position_id, organization_unit_id, name]);

  return {data, loading, refetch: fetchEmployees, options};
};

export default useUserProfiles;
