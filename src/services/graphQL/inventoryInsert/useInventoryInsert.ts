import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryInsertData} from '../../../types/graphQL/inventoryOverview';

const useInventoryInsert = () => {
  const [loading, setLoading] = useState(false);

  const insertInventory = async (data: InventoryInsertData[], onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await GraphQL.inventoryInsert(data);
    if (response.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: insertInventory};
};

export default useInventoryInsert;
