import {useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';
import useAppContext from '../../../context/useAppContext';
import {InventoryItem} from '../../../types/graphQL/inventoryOverview';

const useInventoriesExpireOverview = () => {
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();
  const fetchInventoryOverview = async (type: 'movable' | 'immovable', onSuccess: (data: InventoryItem[]) => void) => {
    setLoading(true);

    try {
      const response = await fetch(GraphQL.inventoryOverview, {
        page: 1,
        size: 1000,
        expire: true,
        type,
      });
      onSuccess(response?.basicInventory_Overview?.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return {fetch: fetchInventoryOverview, loading};
};

export default useInventoriesExpireOverview;
