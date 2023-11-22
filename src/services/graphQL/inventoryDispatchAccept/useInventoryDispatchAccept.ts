import {useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';

const useDispatchAccept = () => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const acceptDispatch = async (id: number, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await fetch(GraphQL.inventoryDispatchAccept, {dispatch_id: id});
    if (response.basicInventoryDispatch_Accept.status === 'success') {
      onSuccess && onSuccess();
      setLoading(false);
    } else {
      onError && onError();
      setLoading(false);
    }
  };

  return {loading, mutate: acceptDispatch};
};

export default useDispatchAccept;
