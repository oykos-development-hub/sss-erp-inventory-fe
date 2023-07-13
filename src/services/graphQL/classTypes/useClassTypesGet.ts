import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {ClassTypesParams} from '../../../types/graphQL/classTypes';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {createDropdownOptions} from '../../../utils/createDropdownOptions';

const useClassTypesGet = ({search, id}: ClassTypesParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['settingsDropdown_Overview']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClassTypes = async () => {
    setLoading(true);

    try {
      const response = await GraphQL.classTypesGet({search, id});

      const options = createDropdownOptions(response.items || []);
      setOptions(options);

      setData(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClassTypes();
  }, [search, id]);

  return {data: data, loading, refetch: fetchClassTypes, options};
};

export default useClassTypesGet;
