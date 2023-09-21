import {Pagination} from 'client-library';
import {useState} from 'react';
import InventoryDispatchList from '../../components/inventoryDispatchList/inventoryDispatchList';
import {PAGE_SIZE} from '../../constants';
import useInventoryDispatchOverview from '../../services/graphQL/inventoryDispatchOverview/useInventoryDispatchOverview';
import {InventoryProps} from '../../types/inventoryProps';
import {initialReceiveFilterValues} from './constants';
import {InventoryDispatchFilters} from './types';

const InventoryDispatch = ({context}: InventoryProps) => {
  const [page, setPage] = useState<number>(0);
  const [filterValues, setFilterValues] = useState<InventoryDispatchFilters>(initialReceiveFilterValues);

  const onFilter = (value: any, name: string) => {
    setFilterValues({...filterValues, [name]: value});
  };
  const type = context.navigation.location.pathname.split('/')[2] === 'movable-inventory' ? 'movable' : 'unmovable';

  const {data, refetch} = useInventoryDispatchOverview({
    page,
    size: PAGE_SIZE,
    ...filterValues,
    type: type,
    id: 0,
    context,
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <InventoryDispatchList
        refetch={refetch}
        context={context}
        tableData={data.items}
        onFilter={onFilter}
        filterValues={filterValues}
      />
      <Pagination
        pageCount={data.total! / PAGE_SIZE}
        onChange={onPageChange}
        variant="filled"
        itemsPerPage={PAGE_SIZE}
        previousLabel="Previous"
        nextLabel="Next"
        pageRangeDisplayed={3}
        style={{marginTop: '20px'}}
      />
    </div>
  );
};

export default InventoryDispatch;
