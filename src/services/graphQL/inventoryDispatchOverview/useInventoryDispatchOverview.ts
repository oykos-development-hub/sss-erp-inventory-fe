import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {PaginationProps} from '../../../types/paginationParams';
import {InventoryDispatchFilters} from '../../../screens/inventoryDispatch/types';
import {MicroserviceProps} from '../../../types/micro-service-props';

interface InventoryDispatchHookParams extends InventoryDispatchFilters, PaginationProps {
  id: number;
  context: MicroserviceProps;
}

const useInventoryDispatchOverview = ({
  context,
  page,
  size,
  id,
  source_organization_unit,
  accepted,
  type,
}: InventoryDispatchHookParams) => {
  const [data, setData] = useState<GraphQLResponse['data']['basicInventoryDispatch_Overview']>(initialOverviewData);
  const [loading, setLoading] = useState(true);

  const fetchInventoryDispatchOverview = async () => {
    setLoading(true);

    try {
      const response = await context.fetch(GraphQL.inventoryDispatchOverview, {
        page,
        size,
        id,
        source_organization_unit_id: source_organization_unit?.id,
        type,
        accepted,
      });

      setData(response?.basicInventoryDispatch_Overview);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInventoryDispatchOverview();
  }, [page, size, source_organization_unit, type, accepted, id]);

  return {data: data, loading, refetch: fetchInventoryDispatchOverview};
};

export default useInventoryDispatchOverview;
