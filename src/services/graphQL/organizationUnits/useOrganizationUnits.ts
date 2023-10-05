import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {OrganizationUnit} from '../../../types/graphQL/organizationUnits';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {DropdownDataNumber} from '../../../types/dropdownData';
import useAppContext from '../../../context/useAppContext';

const useOrganizationUnits = () => {
  const [data, setData] = useState<GraphQLResponse['data']['organizationUnits']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const {fetch, graphQl} = useAppContext();

  const fetchOrganizationUnits = async () => {
    try {
      const response = await fetch(graphQl.getOrganizationUnits);

      const options = response?.organizationUnits?.items.map((item: OrganizationUnit) => ({
        id: item.id,
        title: item.title,
      }));
      setOptions(options);

      setData(response?.organizationUnits);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrganizationUnits();
  }, []);

  return {data, fetch: fetchOrganizationUnits, options};
};

export default useOrganizationUnits;
