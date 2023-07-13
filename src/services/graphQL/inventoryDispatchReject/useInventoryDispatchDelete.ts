import {useState} from 'react';
import {GraphQL} from '..';

const UseDispatchDelete = () => {
  const [loading, setLoading] = useState(false);

  const deleteDispatch = async (id: number, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await GraphQL.inventoryDispatchDelete(id);
    if (response.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: deleteDispatch};
};

export default UseDispatchDelete;
