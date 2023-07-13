import {useState} from 'react';
import {GraphQL} from '..';

const useDispatchAccept = () => {
  const [loading, setLoading] = useState(false);

  const acceptDispatch = async (id: number, userId: number, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await GraphQL.inventoryDispatchAccept(id, userId);
    if (response.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: acceptDispatch};
};

export default useDispatchAccept;
