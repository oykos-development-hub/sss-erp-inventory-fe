import {Pagination} from 'client-library';
import {useEffect, useState} from 'react';
import InventoryList from '../../components/inventoryList/inventoryList';
import {PAGE_SIZE} from '../../constants';
import useInventoryOverview from '../../services/graphQL/inventoryOverview/useInventoryOverview';
import {InventoryProps} from '../../types/inventoryProps';
import {initialInventoryFilters, inventoryFilters} from './constants';

const InventoryOverview = ({context, type}: InventoryProps) => {
  const [page, setPage] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterValues, setFilterValues] = useState(initialInventoryFilters[type]);

  const {data, refetch, loading} = useInventoryOverview({
    page,
    size: PAGE_SIZE,
    type,
    source_type: filterValues.source_type?.id,
    class_type_id: filterValues.class_type_id?.id,
    search: debouncedSearch,
    office_id: filterValues.office_id?.id,
    depreciation_type_id: filterValues.depreciation_type_id?.id,
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onFilter = (value: any, name: string) => {
    setFilterValues({...filterValues, [name]: name === 'search' ? value.target.value : value});
  };

  useEffect(() => {
    setTimeout(() => {
      setDebouncedSearch(filterValues.search);
    }, 500);
  }, [filterValues.search]);

  return (
    <div>
      <InventoryList
        context={context}
        filters={inventoryFilters[type]}
        tableData={data.items || []}
        loading={loading}
        filterValues={filterValues}
        onFilter={onFilter}
        type={type}
        refetch={refetch}
      />
      <Pagination
        pageCount={data.total ? data.total / PAGE_SIZE : 0}
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

export default InventoryOverview;
