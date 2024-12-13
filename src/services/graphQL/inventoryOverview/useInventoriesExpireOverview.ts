import {useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';
import {InventoryItem} from '../../../types/graphQL/inventoryOverview';

const useInventoriesExpireOverview = () => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const fetchInventoryOverview = async (
    type: 'movable' | 'immovable',
    onSuccess: (data: InventoryItem[]) => void,
    organization_unit_id?: number,
  ) => {
    setLoading(true);

    try {
      const response = await fetch(GraphQL.inventoryOverview, {
        page: 1,
        size: 1000,
        expire: true,
        type,
        organization_unit_id,
      });
      onSuccess(response?.basicInventory_Overview?.items);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return {fetch: fetchInventoryOverview, loading};
};

export default useInventoriesExpireOverview;
