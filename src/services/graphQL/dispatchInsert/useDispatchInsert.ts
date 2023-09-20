import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryDispatchData} from '../../../types/graphQL/inventoryDispatch';
import {MicroserviceProps} from '../../../types/micro-service-props';

const useDispatchInsert = ({context}: MicroserviceProps) => {
  const [loading, setLoading] = useState(false);

  const insertDispatch = async (data: InventoryDispatchData, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await context.fetch(GraphQL.dispatchInsert, {data});
    if (response.basicInventoryDispatch_Insert.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: insertDispatch};
};

export default useDispatchInsert;
