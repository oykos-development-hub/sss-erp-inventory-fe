import {useEffect, useState} from 'react';
import {InventoryOverviewParams} from '../../../types/graphQL/inventoryOverview';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';
import useAppContext from '../../../context/useAppContext';

const useInventoryOverview = ({
  page,
  size,
  class_type_id,
  id,
  office_id,
  search,
  type,
  source_type = '',
  depreciation_type_id,
}: InventoryOverviewParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventory_Overview']>(initialOverviewData);
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();
  const fetchInventoryOverview = async () => {
    setLoading(true);

    try {
      const response = await fetch(GraphQL.inventoryOverview, {
        page: Number(page) + 1,
        size,
        class_type_id,
        id,
        office_id,
        search,
        type,
        source_type,
        depreciation_type_id,
      });

      setData(response?.basicInventory_Overview);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInventoryOverview();
  }, [page, size, class_type_id, id, office_id, search, type, source_type, depreciation_type_id]);

  return {data, loading, refetch: fetchInventoryOverview};
};

export default useInventoryOverview;
