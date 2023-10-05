import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';
import useAppContext from '../../../context/useAppContext';

const useInventoryDetails = (id: number) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventory_Details']>();
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();
  const fetchInventoryDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(GraphQL.inventoryDetailsGet, {id});

      setData(response?.basicInventory_Details);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInventoryDetails();
  }, [id]);

  return {data, loading, refetch: fetchInventoryDetails};
};

export default useInventoryDetails;
