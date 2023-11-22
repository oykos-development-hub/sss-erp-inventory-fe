import {useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';

const UseDispatchDelete = () => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const deleteDispatch = async (id: number, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await fetch(GraphQL.inventoryDispatchDelete, {id});
    if (response.basicInventoryDispatch_Delete.status === 'success') {
      onSuccess && onSuccess();
      setLoading(false);
    } else {
      onError && onError();
      setLoading(false);
    }
  };

  return {loading, mutate: deleteDispatch};
};

export default UseDispatchDelete;
