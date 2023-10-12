import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {ClassTypesParams} from '../../../types/graphQL/classTypes';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {createDropdownOptions} from '../../../utils/createDropdownOptions';
import useAppContext from '../../../context/useAppContext';

const useGetSettings = ({search, id, entity}: ClassTypesParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['settingsDropdown_Overview']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const {fetch, graphQl} = useAppContext();

  const fetchClassTypes = async () => {
    setLoading(true);
    try {
      const response = await fetch(graphQl.getSettings, {search, id, entity});
      const options = createDropdownOptions(response.settingsDropdown_Overview.items || []);
      setOptions(options);

      setData(response.settingsDropdown_Overview);
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

export default useGetSettings;
