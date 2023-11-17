import {useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';
import {InventoryDispatch} from '../../../types/graphQL/inventoryDispatch';

const useInventoryDispatchDetails = () => {
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();
  const fetchInventoryDispatch = async (id: number, onSuccess: (data: InventoryDispatch) => void) => {
    setLoading(true);
    try {
      const response = await fetch(GraphQL.inventoryDispatchOverview, {
        id,
      });
      onSuccess && onSuccess(response?.basicInventoryDispatch_Overview?.items[0]);
      setLoading(false);
    } catch (err) {
      console.log('Error', err);
    }
  };

  return {loading, fetchDispatch: fetchInventoryDispatch};
};

export default useInventoryDispatchDetails;
