import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {DepreciationTypesParams} from '../../../types/graphQL/depreciationTypes';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {createDropdownOptions} from '../../../utils/createDropdownOptions';

const useDepreciationTypesGet = ({page, size, id}: DepreciationTypesParams) => {
  const [data, setData] =
    useState<GraphQLResponse['data']['basicInventoryDepreciationTypes_Overview']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepreciationTypes = async () => {
    setLoading(true);

    try {
      const response = await GraphQL.depreciationTypesGet({page, size, id});

      const options = createDropdownOptions(response.items || []);
      setOptions(options);

      setData(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDepreciationTypes();
  }, [page, size, id]);

  return {data: data, loading, refetch: fetchDepreciationTypes, options};
};

export default useDepreciationTypesGet;
