import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {OfficeParams} from '../../../types/graphQL/organizationUnitOffices';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {createDropdownOptions} from '../../../utils/createDropdownOptions';
import useAppContext from '../../../context/useAppContext';

const useOrgUnitOfficesGet = ({page, size, id, organization_unit_id}: OfficeParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['officesOfOrganizationUnits_Overview']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();

  const fetchOrganizationUnitOffices = async () => {
    if (!organization_unit_id) return;

    setLoading(true);

    try {
      const response = await fetch(GraphQL.organizationUnitOfficesGet, {page, size, id, organization_unit_id});
      const options = createDropdownOptions(response?.officesOfOrganizationUnits_Overview?.items || []);
      setOptions(options);

      setData(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrganizationUnitOffices();
  }, [page, size, id, organization_unit_id]);

  return {data: data, loading, refetch: fetchOrganizationUnitOffices, options};
};

export default useOrgUnitOfficesGet;
