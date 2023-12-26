import {DownloadIcon, Table, TableHead, Theme, Typography} from 'client-library';
import {useState} from 'react';
import useAppContext from '../../context/useAppContext';
import {InventoryDispatchFilters} from '../../screens/inventoryDispatch/types';
import useInventoryDispatchDetails from '../../services/graphQL/inventoryDispatchOverview/useInventoryDispatchDetails';
import useOrganizationUnits from '../../services/graphQL/organizationUnits/useOrganizationUnits';
import {InventoryDispatch} from '../../types/graphQL/inventoryDispatch';
import {MicroserviceProps} from '../../types/micro-service-props';
import {parseDate} from '../../utils/dateUtils';
import ReceiveInventoryModal from '../receiveInventoryModal/receiveInventoryModal';
import {receiveInventoryStatus, receiveInventoryType} from './constants';
import {FilterDropdown, Filters} from './styles';

interface InventoryDispatchList {
  context: MicroserviceProps;
  tableData: InventoryDispatch[];
  loading: boolean;
  filterValues: InventoryDispatchFilters;
  onFilter: (value: any, name: string) => void;
  refetch: () => void;
}

const InventoryDispatchList = ({
  context,
  tableData,
  loading,
  filterValues,
  onFilter,
  refetch,
}: InventoryDispatchList) => {
  const [receiveModal, setReceiveModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>();
  const [targetOrgID, setTargetOrgID] = useState<number>();
  const {options: locationOptions} = useOrganizationUnits();
  const {
    reportService: {generatePdf},
  } = useAppContext();

  const {fetchDispatch} = useInventoryDispatchDetails();

  const receiveInventoryTableHeads: TableHead[] = [
    {
      title: 'Tip',
      accessor: 'type',
      type: 'custom',
      renderContents: type => <Typography variant="bodyMedium" content={type == 'revers' ? 'Revers' : 'Povraćaj'} />,
    },
    {
      title: 'Datum',
      accessor: 'created_at',
      type: 'custom',
      renderContents: date => <Typography variant="bodyMedium" content={date ? parseDate(date) : ''} />,
    },
    {
      title: 'Pošiljalac',
      accessor: 'source_organization_unit',
      type: 'custom',
      renderContents: source_organization_unit => (
        <Typography variant="bodyMedium" content={source_organization_unit?.title} />
      ),
    },
    {
      title: 'Status',
      accessor: 'is_accepted',
      type: 'custom',
      renderContents: is_accepted => (
        <Typography variant="bodyMedium" content={is_accepted ? 'Prihvaćen' : 'Na čekanju'} />
      ),
    },

    {title: '', accessor: 'TABLE_ACTIONS', type: 'tableActions'},
  ];

  const fetchPDFUrl = (id: number) => {
    fetchDispatch(id, data => {
      generatePdf('REVERS', data);
    });
  };

  const onRowClick = (item: InventoryDispatch) => {
    if (item.type === 'revers' || item.type === 'return-revers') {
      setCurrentId(item.id);
      setTargetOrgID(item?.target_organization_unit?.id);
      setReceiveModal(true);
    }
  };

  return (
    <div>
      <Filters>
        <FilterDropdown
          label="TIP:"
          options={receiveInventoryType}
          onChange={(value: any) => onFilter(value, 'type')}
          value={filterValues.type as any}
          name="type"
          placeholder="Odaberi tip"
        />

        <FilterDropdown
          label="STATUS:"
          options={receiveInventoryStatus}
          onChange={(value: any) => onFilter(value, 'accepted')}
          value={filterValues.accepted as any}
          name="accepted"
          placeholder="Odaberi status"
        />

        <FilterDropdown
          label="ORGANIZACIONA JEDINICA:"
          options={locationOptions}
          onChange={value => onFilter(value, 'source_organization_unit')}
          value={filterValues.source_organization_unit}
          name="source_organization_unit"
          placeholder="Odaberi organizacionu jedinicu"
        />
      </Filters>
      <Table
        isLoading={loading}
        tableHeads={receiveInventoryTableHeads}
        data={tableData}
        onRowClick={onRowClick}
        tableActions={[
          {
            name: 'print',
            onClick: row => fetchPDFUrl(row.id),
            icon: <DownloadIcon stroke={Theme.palette.gray600} />,
          },
        ]}
      />
      {receiveModal && (
        <ReceiveInventoryModal
          refetch={refetch}
          context={context}
          id={currentId}
          targetOrgID={targetOrgID}
          onClose={() => {
            setReceiveModal(false);
            setCurrentId(undefined);
          }}
        />
      )}
      <div></div>
    </div>
  );
};

export default InventoryDispatchList;
