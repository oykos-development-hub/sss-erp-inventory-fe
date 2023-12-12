import {useEffect, useState} from 'react';
import useAppContext from '../../../context/useAppContext';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {OrganizationUnit} from '../../../types/graphQL/organizationUnits';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {initialOverviewData} from '../../constants';

const useOrganizationUnits = (onlyParent?: boolean) => {
  const [data, setData] = useState<GraphQLResponse['data']['organizationUnits']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const {fetch, graphQl} = useAppContext();

  const fetchOrganizationUnits = async () => {
    try {
      const response = await fetch(graphQl.getOrganizationUnits, {settings: true});

      const options = response?.organizationUnits?.items
        .filter((item: OrganizationUnit) => (!item.parent_id && onlyParent) || !onlyParent)
        .map((item: OrganizationUnit) => ({
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
