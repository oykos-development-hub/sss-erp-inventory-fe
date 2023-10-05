import {useState} from 'react';
import {MicroserviceProps} from '../../../types/micro-service-props';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';

const useDispatchAccept = (context: MicroserviceProps) => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const acceptDispatch = async (id: number, userId: number, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await fetch(GraphQL.inventoryDispatchAccept, {id, userId});
    if (response.basicInventoryDispatch_Accept.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: acceptDispatch};
};

export default useDispatchAccept;
