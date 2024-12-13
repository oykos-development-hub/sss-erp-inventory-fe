import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';
import useAppContext from '../../../context/useAppContext';
import {InventoryDetails} from '../../../types/graphQL/inventoryDetails';

const useInventoryDetails = (id?: number) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventory_Details']>();
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const fetchInventoryDetails = async (rowId?: number, onSuccess?: (data: InventoryDetails) => void) => {
    if (!id && !rowId) return;
    try {
      setLoading(true);
      const response = await fetch(GraphQL.inventoryDetailsGet, {id: id || rowId});
      if (response?.basicInventory_Details?.items?.assessments.length > 0)
        response?.basicInventory_Details?.items.assessments.pop();
      onSuccess && onSuccess(response?.basicInventory_Details?.items);
      setData(response?.basicInventory_Details);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInventoryDetails();
  }, [id]);

  return {data, loading, refetch: fetchInventoryDetails};
};

export default useInventoryDetails;
