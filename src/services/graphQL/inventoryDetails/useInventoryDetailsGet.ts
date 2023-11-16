import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';
import useAppContext from '../../../context/useAppContext';
import {InventoryDetails} from '../../../types/graphQL/inventoryDetails';

const useInventoryDetails = (id?: number) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventory_Details']>();
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();
  const fetchInventoryDetails = async (rowId?: number, onSuccess?: (data: InventoryDetails) => void) => {
    setLoading(true);
    if (!id && !rowId) return;
    try {
      const response = await fetch(GraphQL.inventoryDetailsGet, {id: id || rowId});

      onSuccess && onSuccess(response?.basicInventory_Details?.items);
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
