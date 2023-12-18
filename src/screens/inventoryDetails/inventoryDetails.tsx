import {Divider, Table, TableHead, Theme, DownloadIcon, Typography, FileIcon} from 'client-library';
import {useMemo, useState} from 'react';
import AssessmentModal from '../../components/assessmentModal/assessmentModal';
import ImmovableDetailsForm from '../../components/immovableDetailsForm/immovableDetailsForm';
import {ScreenTitle} from '../../components/inventoryTabs/styles';
import MovableDetailsForm from '../../components/movableDetailsForm/movableDetailsForm';
import SmallDetailsForm from '../../components/smallDetailsForm/smallDetailsForm';
import useInventoryDetails from '../../services/graphQL/inventoryDetails/useInventoryDetailsGet';
import PlusButton from '../../shared/plusButton';
import ScreenWrapper from '../../shared/screenWrapper';
import SectionBox from '../../shared/sectionBox';
import {InventoryProps} from '../../types/inventoryProps';
import {estimationTableHeads, movementsTableHeads} from './constants';
import {InventoryDetailsWrapper, TableHeader} from './style';
import MovementModal from '../../components/movementModal/movementModal';
import {InventoryAssessment} from '../../types/graphQL/inventoryAssessment';
import {SettingsDropdownOverview} from '../../types/graphQL/classTypes';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import ReceiveInventoryModal from '../../components/receiveInventoryModal/receiveInventoryModal';
import FileModalView from '../../components/fileModalView/fileModalView';
import {FileItem} from '../../types/graphQL/inventoryDetails';
import useInventoryDispatchDetails from '../../services/graphQL/inventoryDispatchOverview/useInventoryDispatchDetails';
import useAppContext from '../../context/useAppContext';
import {InventoryTypeEnum} from '../../types/inventoryType';

const InventoryDetails = ({context, type}: InventoryProps) => {
  const [assessmentModal, setAssessmentModal] = useState(false);
  const [movementModal, setMovementModal] = useState(false);
  const [receiveModal, setReceiveModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>();
  const [fileToView, setFileToView] = useState<FileItem>();
  const {fetchDispatch} = useInventoryDispatchDetails();

  const {
    reportService: {generatePdf},
  } = useAppContext();

  const fetchPDFUrl = (id: number) => {
    fetchDispatch(id, data => {
      generatePdf('REVERS', data);
    });
  };

  const {data: depreciationTypes} = useGetSettings({entity: 'deprecation_types'});

  const id = context.navigation.location.pathname.split('/').pop();
  const orgUnitId = context?.contextMain?.organization_unit?.id;

  const {data, refetch, loading} = useInventoryDetails(id);

  const getDepreciationRate = (item: InventoryAssessment) => {
    const depreciationType = depreciationTypes?.items?.find(
      (type: SettingsDropdownOverview) => item.depreciation_type?.id === type.id,
    );

    if (depreciationType) {
      return 100 / Number(depreciationType.value) + '%';
    } else {
      return 0 + '%';
    }
  };

  const getUpdatedTableHeads: TableHead[] = useMemo(
    () => [
      ...estimationTableHeads.slice(0, 3),
      {
        title: 'Amortizaciona stopa',
        accessor: '',
        type: 'custom',
        renderContents: (_: any, row: InventoryAssessment) => (
          <Typography variant="bodyMedium" content={getDepreciationRate(row)} />
        ),
      },
      ...estimationTableHeads.slice(3),
    ],
    [data, depreciationTypes, getDepreciationRate],
  );

  const onCloseMovementModal = () => {
    setMovementModal(false);
  };

  const checkSetMovementModal = (): boolean => {
    if (!data?.items.target_organization_unit?.id) return false;
    if (data?.items.target_organization_unit?.id !== orgUnitId) return true;
    return false;
  };

  return (
    <ScreenWrapper>
      <SectionBox>
        {type !== InventoryTypeEnum.IMMOVABLE && (
          <ScreenTitle content={`INV. BROJ: ${data?.items.inventory_number ?? ''} - ${data?.items.title ?? ''}`} />
        )}
        <Divider color={Theme.palette.black} style={{marginBottom: 22, marginTop: 10}} />

        <InventoryDetailsWrapper>
          {type === InventoryTypeEnum.MOVABLE && (
            <MovableDetailsForm
              context={context}
              data={data ? data.items : null}
              inventoryType={type}
              refetch={refetch}
              inventoryId={id}
            />
          )}
          {type === InventoryTypeEnum.IMMOVABLE && (
            <ImmovableDetailsForm
              context={context}
              data={data ? data.items : null}
              inventoryType={type}
              refetch={refetch}
              inventoryId={id}
            />
          )}
          {type === InventoryTypeEnum.SMALL && (
            <SmallDetailsForm
              context={context}
              data={data ? data.items : null}
              inventoryType={type}
              refetch={refetch}
              inventoryId={id}
            />
          )}

          <div>
            <TableHeader>
              <Typography variant="caption" content="kretanje sredstva" />
              <PlusButton disabled={checkSetMovementModal()} onClick={() => setMovementModal(true)} />
            </TableHeader>
            <Table
              tableHeads={movementsTableHeads}
              data={data?.items?.movements || []}
              isLoading={loading}
              tableActions={[
                {
                  name: 'showFile',
                  icon: <FileIcon stroke={Theme.palette.gray600} />,
                  onClick: (row: any) => {
                    setFileToView(row?.file);
                  },
                  shouldRender: (row: any) => row?.file?.id !== 0,
                },
                {
                  name: 'print',
                  icon: <DownloadIcon stroke={Theme.palette.gray600} />,
                  onClick: row => fetchPDFUrl(row?.id),
                },
              ]}
            />
          </div>
          {type !== InventoryTypeEnum.SMALL && (
            <div>
              <TableHeader>
                <Typography variant="caption" content="procjene" />
                <PlusButton
                  disabled={data?.items.source_type?.includes('2')}
                  onClick={() => setAssessmentModal(true)}
                />
              </TableHeader>
              <Table
                tableHeads={getUpdatedTableHeads}
                data={data?.items.assessments || []}
                isLoading={loading}
                tableActions={[
                  {
                    name: 'print',
                    icon: <DownloadIcon stroke={Theme.palette.gray600} />,
                    onClick: () => {
                      console.log('printed estimation test');
                    },
                  },
                ]}
              />
            </div>
          )}
          {fileToView && <FileModalView file={fileToView} onClose={() => setFileToView(undefined)} />}
          {assessmentModal && (
            <AssessmentModal
              refetch={refetch}
              onClose={() => setAssessmentModal(false)}
              context={context}
              id={id}
              depreciation_type_id={data?.items.depreciation_type?.id || 0}
            />
          )}
          {movementModal && (
            <MovementModal
              context={context}
              onClose={onCloseMovementModal}
              id={id}
              refetch={refetch}
              sourceType={data?.items.source_type}
              currentItem={data?.items}
              inventoryType={type}
              status={data?.items?.status || ''}
              openReceiveModal={id => {
                setCurrentId(id);
                setReceiveModal(true);
              }}
              minDate={data?.items?.movements && data?.items?.movements[0] ? data?.items?.movements[0].date : undefined}
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
        </InventoryDetailsWrapper>
      </SectionBox>
    </ScreenWrapper>
  );
};

export default InventoryDetails;
