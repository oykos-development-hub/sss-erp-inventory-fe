import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryDispatchData} from '../../../types/graphQL/inventoryDispatch';

const useDispatchInsert = () => {
  const [loading, setLoading] = useState(false);

  const insertDispatch = async (data: InventoryDispatchData, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await GraphQL.dispatchInsert(data);
    if (response.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: insertDispatch};
};

export default useDispatchInsert;
