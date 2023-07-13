import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {initialOverviewData} from '../../constants';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {PaginationProps} from '../../../types/paginationParams';
import {InventoryDispatchFilters} from '../../../screens/inventoryDispatch/types';

interface InventoryDispatchHookParams extends InventoryDispatchFilters, PaginationProps {
  id: number;
}

const useInventoryDispatchOverview = ({
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
      const response = await GraphQL.inventoryDispatchOverview({
        page,
        size,
        id: id ?? 0,
        source_organization_unit_id: source_organization_unit ? source_organization_unit.id : 0,
        type: type ? type.id : '',
        accepted: accepted ? accepted.id : null,
      });

      setData(response);
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
