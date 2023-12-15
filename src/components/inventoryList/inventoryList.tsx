import {Button, DownloadIcon, Table, TableHead, Theme} from 'client-library';
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
import useInventoryDeactivate from '../../services/graphQL/inventoryDeactivate/useInventoryDeactivate';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import {DispatchType} from '../../types/graphQL/inventoryDispatch';
import {InventoryItem, SourceType} from '../../types/graphQL/inventoryOverview';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {MicroserviceProps} from '../../types/micro-service-props';
import {parseDateForBackend} from '../../utils/dateUtils';
import AssessmentModal from '../assessmentModal/assessmentModal';
import DeactivateModal from '../deactivateModal/deactivateModal';
import {filterExpireOptions, filterStatusOptions} from '../movementModal/constants';
import MovementModal from '../movementModal/movementModal';
import ReceiveInventoryModal from '../receiveInventoryModal/receiveInventoryModal';
import {FilterDropdown, FilterInput, Filters, ReversButtonContainer} from './styles';

import useAppContext from '../../context/useAppContext';
import useInventoryDetails from '../../services/graphQL/inventoryDetails/useInventoryDetailsGet';
import useInventoriesExpireOverview from '../../services/graphQL/inventoryOverview/useInventoriesExpireOverview';
// import useInventoryPS1PDF from '../../services/graphQL/inventoryPS1PDF/useInventoryPS1PDF';

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
  const [inventoriesExpire, setInventoriesExpire] = useState<InventoryItem[]>([]);
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

  const {
    reportService: {generatePdf},
    spreadsheetService: {openImportModal},
  } = useAppContext();
  const {refetch: fetchDetails} = useInventoryDetails();

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
    expire: (
      <FilterDropdown
        name="expire"
        value={filterValues.expire}
        onChange={value => onFilter(value, 'expire')}
        options={[...filterExpireOptions]}
        placeholder="Odaberi"
        label="OBRAČUN AMORTIZACIJE:"
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

  const {fetch: fetchInventoriesExpire} = useInventoriesExpireOverview();

  const fetchPDFUrl = (id: number) => {
    fetchDetails(id, data => {
      setSourceType(data.source_type);
      if (data.source_type.includes('NS')) {
        generatePdf('IMMOVABLE_INVENTORY_REPORT', data);
      } else {
        generatePdf('MOVABLE_INVENTORY_REPORT', data);
      }
    });
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

  const onSubmitUploadedTable = () => {
    console.log('exel');
  };
  const handleUploadTable = () => {
    console.log('exel');
  };

  const onDispatchClick = () => {
    fetchInventoriesExpire(items => {
      if (items.length > 0) {
        const props = {
          type: 'EXPIRE_INVENTORIES',
          data: items,
          onSubmit: onSubmitUploadedTable,
          handleUpload: handleUploadTable,
          content: 'Tabela amortizacije',
        };
        openImportModal(props);
      } else {
        alert.info('Nema artikala kojima ističe amortizacije na 31.12. tekuće godine.');
      }
    });
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
              {type === 'movable' && (
                <Button content={'Amortizacija'} variant="primary" size="sm" onClick={onDispatchClick} />
              )}

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
    if (
      isReversDone(row) ||
      !row.active ||
      (row?.target_organization_unit?.id && row?.target_organization_unit?.id !== orgUnitId)
    ) {
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
                  onClick: row => fetchPDFUrl(row.id),
                  icon: <DownloadIcon stroke={Theme.palette.gray600} />,
                },
                {
                  name: 'Alokacija',
                  onClick: row => onAddMovement(row),
                  disabled: (item: InventoryItem) =>
                    (item.target_organization_unit.id && orgUnitId !== item.target_organization_unit.id) ||
                    !item.active,
                },
                {
                  name: 'Dodaj procjenu',
                  onClick: row => onAddEstimation(row),
                  shouldRender: (item: any) => item.source_type?.includes('1'),
                  disabled: (item: InventoryItem) =>
                    (item.target_organization_unit.id && orgUnitId !== item.target_organization_unit.id) ||
                    !item.active,
                },
                {
                  name: 'Otpis',
                  onClick: row => {
                    setCurrentInventoryId([row.id]);
                    setDeactivateModal(true);
                  },
                  disabled: (item: InventoryItem) =>
                    item.source_type?.includes('2') ||
                    item.status !== 'Nezadužen' ||
                    (item.target_organization_unit.id && orgUnitId !== item.target_organization_unit.id) ||
                    !item.active,
                },
              ]
            : [
                {
                  name: 'print',
                  onClick: row => fetchPDFUrl(row.id),
                  icon: <DownloadIcon stroke={Theme.palette.gray600} />,
                },
                {
                  name: 'Alokacija',
                  onClick: row => onAddMovement(row),
                  disabled: (item: InventoryItem) => orgUnitId !== item.target_organization_unit.id || !item.active,
                },
                {
                  name: 'Otpis',
                  onClick: row => {
                    setCurrentInventoryId([row.id]);
                    setDeactivateModal(true);
                  },
                  disabled: (item: InventoryItem) =>
                    item.source_type?.includes('2') ||
                    item.status !== 'Nezadužen' ||
                    orgUnitId !== item.target_organization_unit.id ||
                    !item.active,
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
        <AssessmentModal
          context={context}
          onClose={() => setEstimationModal(false)}
          id={currentInventoryId[0]}
          depreciation_type_id={currentItem?.depreciation_type?.id || 0}
        />
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
