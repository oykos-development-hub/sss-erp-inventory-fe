import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {OrganizationUnit} from '../../../types/graphQL/organizationUnits';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {DropdownDataNumber} from '../../../types/dropdownData';

const useOrganizationUnits = (props?: any) => {
  const [data, setData] = useState<GraphQLResponse['data']['organizationUnits']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);

  const fetchOrganizationUnits = async () => {
    try {
      const response = await GraphQL.organizationUnitsGet();

      const options = response.items.map((item: OrganizationUnit) => ({id: item.id, title: item.title}));
      setOptions(options);

      setData(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrganizationUnits();
  }, [props]);

  return {data, fetch: fetchOrganizationUnits, options};
};

export default useOrganizationUnits;
