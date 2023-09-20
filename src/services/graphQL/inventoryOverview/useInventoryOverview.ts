import {useEffect, useState} from 'react';
import {InventoryOverviewParams} from '../../../types/graphQL/inventoryOverview';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';

const useInventoryOverview = ({
  context,
  page,
  size,
  class_type_id,
  id,
  office_id,
  search,
  type,
  source_type,
}: InventoryOverviewParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventory_Overview']>(initialOverviewData);
  const [loading, setLoading] = useState(true);

  const fetchInventoryOverview = async () => {
    setLoading(true);

    try {
      const response = await context.fetch(GraphQL.inventoryOverview, {
        page,
        size,
        class_type_id,
        id,
        office_id,
        search,
        type,
        source_type,
      });

      setData(response?.basicInventory_Overview);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInventoryOverview();
  }, [page, size, class_type_id, id, office_id, search, type, source_type]);

  return {data, loading, refetch: fetchInventoryOverview};
};

export default useInventoryOverview;
