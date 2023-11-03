import {Button, PrinterIcon, Table, TableHead, Theme} from 'client-library';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  immovableInventoryTableHeads,
  immovableTypeOptions,
  movableInventoryTableHeads,
  movableTypeOptions,
  smallInventoryTableHeads,
} from '../../screens/inventoryOverview/constants';
import {InventoryFilters, InventoryFiltersEnum} from '../../screens/inventoryOverview/types';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import {DispatchType} from '../../types/graphQL/inventoryDispatch';
import {InventoryItem, SourceType} from '../../types/graphQL/inventoryOverview';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {MicroserviceProps} from '../../types/micro-service-props';
import AssessmentModal from '../assessmentModal/assessmentModal';
import DeactivateModal from '../deactivateModal/deactivateModal';
import MovementModal from '../movementModal/movementModal';
import {FilterDropdown, FilterInput, Filters, ReversButtonContainer} from './styles';
import useInventoryDeactivate from '../../services/graphQL/inventoryDeactivate/useInventoryDeactivate';
import ReceiveInventoryModal from '../receiveInventoryModal/receiveInventoryModal';
import {parseDateForBackend} from '../../utils/dateUtils';
import {filterStatusOptions} from '../movementModal/constants';

interface InventoryListProps {
  context: MicroserviceProps;
  filters: (InventoryFiltersEnum | `${InventoryFiltersEnum}`)[];
  tableData: InventoryItem[];
  loading: boolean;
  onFilter: (value: any, name: string) => void;
  filterValues: InventoryFilters;
  type: InventoryTypeEnum | `${InventoryTypeEnum}`;
  refetch: () => void;
}

const InventoryList = ({
  context,
  filters,
  tableData,
  loading,
  onFilter,
  filterValues,
  type,
  refetch,
}: InventoryListProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [movementType, setMovementType] = useState<DispatchType | `${DispatchType}`>();
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [movementModal, setMovementModal] = useState(false);
  const [estimationModal, setEstimationModal] = useState(false);
  const [currentInventoryId, setCurrentInventoryId] = useState<number[]>([]);
  const [currentItem, setCurrentItem] = useState<InventoryItem>();
  const [sourceType, setSourceType] = useState<SourceType | `${SourceType}`>();
  const [returnOrgUnitId, setReturnOrgUnitId] = useState<number>();
  const [receiveModal, setReceiveModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>();
  const prevStateRef = useRef<number[]>(selectedRows);
  const orgUnitId = context?.contextMain?.organization_unit?.id;

  const {options: officeOptions} = useOrgUnitOfficesGet({page: 1, size: 1000, organization_unit_id: Number(orgUnitId)});

  const {options: amortizationGroupOptions} = useGetSettings({
    entity: 'deprecation_types',
  });

  const {options: classTypeOptions} = useGetSettings({entity: 'inventory_class_type'});
  const {mutate: deactivate, loading: loadingDeactivate} = useInventoryDeactivate();

  const {
    navigation: {navigate},
    alert,
  } = context;

  //todo: add useMemo
  const renderFilters = {
    type: (
      <FilterDropdown
        name="source_type"
        value={filterValues.source_type}
        onChange={value => onFilter(value, 'source_type')}
        options={type === 'movable' ? movableTypeOptions : immovableTypeOptions}
        placeholder="Odaberi tip"
        label="TIP:"
      />
    ),
    class: (
      <FilterDropdown
        name="class_type_id"
        value={filterValues.class_type_id}
        onChange={value => onFilter(value, 'class_type_id')}
        options={[{id: 0, title: 'Sve klase'}, ...classTypeOptions]}
        placeholder="Odaberi klasu"
        label="KLASA:"
      />
    ),
    amortization_group: (
      <FilterDropdown
        name="depreciation_group"
        value={filterValues.depreciation_type_id}
        onChange={value => onFilter(value, 'depreciation_type_id')}
        options={[{id: 0, title: 'Sve grupe'}, ...amortizationGroupOptions]}
        placeholder="Odaberi amortizacionu grupu"
        label="AMORTIZACIONA GRUPA:"
      />
    ),
    location: (
      <FilterDropdown
        name="office"
        value={filterValues.office_id}
        onChange={value => onFilter(value, 'office_id')}
        options={[{id: 0, title: 'Sve lokacije'}, ...officeOptions]}
        placeholder="Odaberi lokaciju"
        label="LOKACIJA:"
      />
    ),
    status: (
      <FilterDropdown
        name="status"
        value={filterValues.status}
        onChange={value => onFilter(value, 'status')}
        options={[{id: '', title: 'Sve statusi'}, ...filterStatusOptions]}
        placeholder="Odaberi status"
        label="STATUS:"
      />
    ),
    search: (
      <FilterInput
        name="search"
        value={filterValues.search}
        label="PRETRAGA:"
        placeholder="Pretraga"
        onChange={value => onFilter(value, 'search')}
      />
    ),
  };

  const onCheck = (checked: boolean, currId: number | null) => {
    if (checked && currId) {
      setSelectedRows([...selectedRows, currId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== currId));
    }
  };

  const onDeactivate = () => {
    console.log('deactivating');
  };

  const onAddEstimation = (row: InventoryItem) => {
    setCurrentInventoryId([row.id]);
    setEstimationModal(true);
  };

  const onCloseMovementModal = (resetCheckboxes?: boolean) => {
    setMovementModal(false);
    setCurrentItem(undefined);
    setSourceType(undefined);
    setMovementType(undefined);

    if (resetCheckboxes) {
      setSelectedRows([]);
    }
  };

  const onReversClick = () => {
    setMovementType(sourceType?.includes('1') ? 'revers' : 'return-revers');

    setCurrentInventoryId(selectedRows);
    setMovementModal(true);
  };

  const onAddMovement = (item: InventoryItem) => {
    const movementType =
      item.source_type === 'NS1' ? 'revers' : item.source_type === 'NS2' ? 'return-revers' : 'allocation';

    setSourceType(sourceType);
    setMovementType(movementType);
    setCurrentInventoryId([item.id]);
    setCurrentItem(item);
    setMovementModal(true);
  };

  const getTableHeads = useMemo(() => {
    const heads: TableHead[] =
      type === 'movable'
        ? movableInventoryTableHeads
        : type === 'immovable'
        ? immovableInventoryTableHeads
        : smallInventoryTableHeads;

    return [
      ...heads,
      {
        title: '',
        customElement:
          type === 'small' ? null : (
            <ReversButtonContainer>
              <Button
                content={sourceType?.includes('2') ? 'Povrat' : 'Revers'}
                variant="primary"
                size="sm"
                onClick={onReversClick}
                disabled={!selectedRows.length}
              />
            </ReversButtonContainer>
          ),
        accessor: 'TABLE_ACTIONS',
        type: 'tableActions',
      },
    ] as TableHead[];
  }, [type, sourceType, selectedRows]);

  const isReversDone = (row: InventoryItem) => {
    return (
      row.source_type?.includes('1') &&
      row.organization_unit?.id !== row.target_organization_unit?.id &&
      row.target_organization_unit?.id !== 0
    );
  };

  const isCheckboxDisabled = (row: InventoryItem) => {
    if (isReversDone(row) || !row.active) {
      return true;
    }

    if (selectedRows.length && sourceType) {
      if (row.source_type.includes('2') && sourceType?.includes('2')) {
        const currentOrgUnitId = tableData.find(item => item.id === selectedRows[0])?.organization_unit.id;
        setReturnOrgUnitId(currentOrgUnitId);
        return row.organization_unit.id !== currentOrgUnitId;
      } else {
        return row.source_type !== sourceType;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (prevStateRef.current && !prevStateRef.current.length && selectedRows.length === 1) {
      const currentItemId = selectedRows[0];
      const currentItem = tableData.find(item => item.id === currentItemId);

      setSourceType(currentItem?.source_type);
    }

    if (!selectedRows.length) {
      setSourceType(undefined);
    }
  }, [selectedRows]);

  return (
    <div>
      <Filters>{filters.map(filter => React.cloneElement(renderFilters[filter], {key: filter}))}</Filters>
      <Table
        tableHeads={getTableHeads}
        isLoading={loading}
        data={tableData}
        checkedRows={selectedRows}
        checkboxes={type !== 'small'}
        onCheck={onCheck}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tableActions={
          type !== 'small'
            ? [
                {
                  name: 'print',
                  onClick: row => console.log('print'),
                  icon: <PrinterIcon stroke={Theme.palette.gray600} />,
                  disabled: (item: any) => !item.active,
                },
                {
                  name: 'Alokacija',
                  onClick: row => onAddMovement(row),
                  disabled: (item: any) => !item.active,
                },
                {
                  name: 'Dodaj procjenu',
                  onClick: row => onAddEstimation(row),
                  shouldRender: (item: any) => item.source_type?.includes('1'),
                  disabled: (item: any) => !item.active,
                },
                {
                  name: 'Deaktivacija',
                  onClick: row => {
                    setCurrentInventoryId([row.id]);
                    setDeactivateModal(true);
                  },
                  disabled: (item: any) => item.source_type?.includes('2') || item.status !== 'Lager' || !item.active,
                },
              ]
            : [
                {
                  name: 'print',
                  onClick: row => console.log('print'),
                  icon: <PrinterIcon stroke={Theme.palette.gray600} />,
                  disabled: (item: any) => !item.active,
                },
                {
                  name: 'Alokacija',
                  onClick: row => onAddMovement(row),
                  disabled: (item: any) => !item.active,
                },
                {
                  name: 'Deaktivacija',
                  onClick: row => {
                    setCurrentInventoryId([row.id]);
                    setDeactivateModal(true);
                  },
                  disabled: (item: any) => item.source_type?.includes('2') || item.status !== 'Lager' || !item.active,
                },
              ]
        }
        onRowClick={(item: InventoryItem) => {
          if (item.active) {
            navigate(`/inventory/${type}-inventory/${item.id}`);
            context.breadcrumbs.add({
              name: `${item.title}`,
              to: `/inventory/${type}-inventory/${item.id}`,
            });
          }
        }}
        disabledCheckbox={isCheckboxDisabled}
      />
      {/* //TODO ID 1 IS ONLY FOR TESTING, REMOVE LATER */}
      {deactivateModal && (
        <DeactivateModal
          onClose={() => setDeactivateModal(false)}
          loading={loadingDeactivate}
          onDeactivate={({inactive, description}) =>
            deactivate(currentInventoryId[0], parseDateForBackend(inactive) || '', description, () => {
              setCurrentInventoryId([]);
              setDeactivateModal(false);
              alert.success('Osnovno sredstvo je deaktivirano.');
            })
          }
          id={0}
        />
      )}
      {movementModal && (
        <MovementModal
          context={context}
          initialDispatchType={movementType}
          onClose={onCloseMovementModal}
          id={currentInventoryId}
          refetch={refetch}
          sourceType={sourceType}
          returnOrgUnitId={returnOrgUnitId}
          inventoryType={type}
          currentItem={currentItem}
          status={currentItem?.status || ''}
          openReceiveModal={id => {
            setCurrentId(id);
            setReceiveModal(true);
          }}
        />
      )}
      {estimationModal && (
        <AssessmentModal context={context} onClose={() => setEstimationModal(false)} id={currentInventoryId[0]} />
      )}

      {receiveModal && currentId && (
        <ReceiveInventoryModal
          refetch={refetch}
          context={context}
          id={currentId}
          targetOrgID={0}
          onClose={() => {
            setReceiveModal(false);
            setCurrentId(undefined);
          }}
          createRevers={true}
        />
      )}
    </div>
  );
};

export default InventoryList;
