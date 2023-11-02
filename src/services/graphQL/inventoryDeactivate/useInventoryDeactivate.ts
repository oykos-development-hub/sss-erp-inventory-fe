import {useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';

const useInventoryDeactivate = () => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const inventoryDeactivate = async (
    id: number,
    inactive: string,
    deactivation_description: string,
    onSuccess?: () => void,
    onError?: () => void,
  ) => {
    setLoading(true);
    const response = await fetch(GraphQL.inventoryDeactivate, {
      id: id,
      inactive: inactive,
      deactivation_description: deactivation_description,
    });
    if (response.basicInventory_Deactivate.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: inventoryDeactivate};
};

export default useInventoryDeactivate;
