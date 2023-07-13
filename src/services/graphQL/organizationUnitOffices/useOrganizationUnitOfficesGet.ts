import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {OfficeParams} from '../../../types/graphQL/organizationUnitOffices';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {createDropdownOptions} from '../../../utils/createDropdownOptions';

const useOrgUnitOfficesGet = ({page, size, id}: OfficeParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['officesOfOrganizationUnits_Overview']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizationUnitOffices = async () => {
    setLoading(true);

    try {
      const response = await GraphQL.organizationUnitOfficesGet({page, size, id});

      const options = createDropdownOptions(response.items || []);
      setOptions(options);

      setData(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrganizationUnitOffices();
  }, [page, size, id]);

  return {data: data, loading, refetch: fetchOrganizationUnitOffices, options};
};

export default useOrgUnitOfficesGet;
