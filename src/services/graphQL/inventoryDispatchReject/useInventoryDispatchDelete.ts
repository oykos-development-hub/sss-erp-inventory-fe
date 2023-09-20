import {useState} from 'react';
import {GraphQL} from '..';
import {MicroserviceProps} from '../../../types/micro-service-props';

const UseDispatchDelete = (context: MicroserviceProps) => {
  const [loading, setLoading] = useState(false);

  const deleteDispatch = async (id: number, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await context.fetch(GraphQL.inventoryDispatchDelete, {id});
    if (response.basicInventoryDispatch_Delete.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: deleteDispatch};
};

export default UseDispatchDelete;
