import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryInsertData} from '../../../types/graphQL/inventoryOverview';
import {MicroserviceProps} from '../../../types/micro-service-props';

const useInventoryInsert = (context: MicroserviceProps) => {
  const [loading, setLoading] = useState(false);

  const insertInventory = async (data: InventoryInsertData[], onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await context.fetch(GraphQL.inventoryInsert, {data});
    if (response.basicInventory_Insert.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: insertInventory};
};

export default useInventoryInsert;
