import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {MicroserviceProps} from '../../../types/micro-service-props';

const useInventoryDetails = (context: MicroserviceProps, id: number) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventory_Details']>();
  const [loading, setLoading] = useState(true);

  const fetchInventoryDetails = async () => {
    setLoading(true);

    try {
      const response = await context.fetch(GraphQL.inventoryDetailsGet, {id});

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
