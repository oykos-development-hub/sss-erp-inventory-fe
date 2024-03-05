import {useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';
import {InventoryOverviewParams} from '../../../types/graphQL/inventoryOverview';

// This one is used only for the reports since the original one is a mess
const useGetReportInventoryListBasic = () => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const {fetch} = useAppContext();
  const fetchInventoryOverview = async ({
    type,
    source_type = '',
    expire = false,
    organization_unit_id,
    page,
    size,
  }: InventoryOverviewParams) => {
    setLoading(true);

    try {
      const response = await fetch(GraphQL.inventoryOverview, {
        type,
        source_type,
        expire,
        organization_unit_id,
        page,
        size,
      });

      setLoading(false);
      setTotal(response?.basicInventory_Overview.total);

      return response?.basicInventory_Overview.items;
    } catch (err) {
      console.log(err);
    }
  };

  return {fetchInventoryOverview, loading, total};
};

export default useGetReportInventoryListBasic;
