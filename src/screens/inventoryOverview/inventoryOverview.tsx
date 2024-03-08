import {Pagination} from 'client-library';
import {ChangeEvent, useEffect, useState} from 'react';
import InventoryList from '../../components/inventoryList/inventoryList';
import {PAGE_SIZE} from '../../constants';
import useInventoryOverview from '../../services/graphQL/inventoryOverview/useInventoryOverview';
import {InventoryProps} from '../../types/inventoryProps';
import {initialInventoryFilters, inventoryFilters, movableTypeOptions} from './constants';
import {useDebounce} from '../../utils/useDebounce.ts';
import {DropdownDataString} from '../../types/dropdownData.ts';

const InventoryOverview = ({context, type}: InventoryProps) => {
  const [page, setPage] = useState(0);
  const [filterValues, setFilterValues] = useState(initialInventoryFilters[type]);

  const organizationID =
    context?.contextMain?.organization_unit?.abbreviation === 'SSSCG'
      ? filterValues?.organization_unit_id?.id
      : context?.contextMain?.organization_unit?.id;

  const debouncedFilterValues = useDebounce(filterValues, 300);

  // reset page to 0 when search value changes
  useEffect(() => {
    setPage(0);
  }, [debouncedFilterValues.search]);

  const {data, refetch, loading} = useInventoryOverview({
    page,
    size: PAGE_SIZE,
    type,
    source_type: debouncedFilterValues.source_type?.id,
    class_type_id: debouncedFilterValues.class_type_id?.id,
    status: debouncedFilterValues.status?.id,
    search: debouncedFilterValues.search,
    office_id: debouncedFilterValues.office_id?.id,
    depreciation_type_id: debouncedFilterValues.depreciation_type_id?.id,
    organization_unit_id: organizationID,
    type_of_immovable_property: debouncedFilterValues.type_of_immovable_property?.title,
    is_external_donation:
      debouncedFilterValues.source_type?.title === movableTypeOptions[2].title
        ? false
        : debouncedFilterValues.source_type?.title === movableTypeOptions[3].title
        ? true
        : null,
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onFilter = (value: DropdownDataString | ChangeEvent<HTMLInputElement>, name: string) => {
    if ('target' in value) {
      setFilterValues({...filterValues, [name]: value.target.value});
    } else {
      setFilterValues({...filterValues, [name]: value});
    }
  };

  return (
    <div>
      <InventoryList
        context={context}
        filters={inventoryFilters[type]}
        tableData={data?.items || []}
        loading={loading}
        filterValues={filterValues}
        onFilter={onFilter}
        type={type}
        refetch={refetch}
      />
      <Pagination
        pageCount={data?.total ? data?.total / PAGE_SIZE : 0}
        onChange={onPageChange}
        variant="filled"
        itemsPerPage={PAGE_SIZE}
        previousLabel="Prethodna"
        nextLabel="Sledeća"
        pageRangeDisplayed={3}
        style={{marginTop: '20px'}}
      />
    </div>
  );
};

export default InventoryOverview;
