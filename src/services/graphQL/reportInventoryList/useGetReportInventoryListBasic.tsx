import {useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';
import {InventoryOverviewParams} from '../../../types/graphQL/inventoryOverview';

// This one is used only for the reports since the original one is a mess
const useGetReportInventoryListBasic = () => {
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();
  const fetchInventoryOverview = async ({
    type,
    source_type = '',
    expire = false,
    organization_unit_id,
  }: InventoryOverviewParams) => {
    setLoading(true);

    try {
      const response = await fetch(GraphQL.inventoryOverview, {
        type,
        source_type,
        expire,
        organization_unit_id,
      });

      setLoading(false);

      return response?.basicInventory_Overview.items;
    } catch (err) {
      console.log(err);
    }
  };

  return {fetchInventoryOverview, loading};
};

export default useGetReportInventoryListBasic;
