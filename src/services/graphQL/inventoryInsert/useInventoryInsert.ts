import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryInsertData} from '../../../types/graphQL/inventoryOverview';
import useAppContext from '../../../context/useAppContext';

const useInventoryInsert = () => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();

  const insertInventory = async (data: InventoryInsertData[], onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await fetch(GraphQL.inventoryInsert, {data});
    if (response?.basicInventory_Insert?.status === 'success') {
      onSuccess && onSuccess();
      setLoading(false);
    } else {
      onError && onError();
      setLoading(false);
    }
  };

  return {loading, mutate: insertInventory};
};

export default useInventoryInsert;
