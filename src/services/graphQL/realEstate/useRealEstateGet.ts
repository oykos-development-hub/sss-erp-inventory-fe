import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {RealEstateParams} from '../../../types/graphQL/realEstateOverview';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';

const useRealEstateGet = ({page, size, id}: RealEstateParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventoryRealEstates_Overview']>(initialOverviewData);
  const [loading, setLoading] = useState(true);

  const fetchRealEstate = async () => {
    setLoading(true);

    try {
      const response = await GraphQL.realEstateGet({page, size, id});

      setData(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRealEstate();
  }, [page, size, id]);

  return {data: data, loading, refetch: fetchRealEstate};
};

export default useRealEstateGet;
