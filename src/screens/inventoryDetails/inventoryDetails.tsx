import {Divider, Table, TableHead, Theme, PrinterIcon, Typography} from 'client-library';
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

const InventoryDetails = ({context, type}: InventoryProps) => {
  const [assessmentModal, setAssessmentModal] = useState(false);
  const [movementModal, setMovementModal] = useState(false);

  const {data: depreciationTypes} = useGetSettings({context: context, entity: 'deprecation_types'});

  const id = context.navigation.location.pathname.split('/').pop();

  const {data, refetch} = useInventoryDetails(context, id);

  const getDepreciationRate = (item: InventoryAssessment) => {
    const depreciationType = depreciationTypes?.items?.find(
      (type: SettingsDropdownOverview) => item.depreciation_type?.id === type.id,
    );

    if (depreciationType) {
      return 100 / Number(depreciationType.value);
    } else {
      return 0;
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
    refetch();
  };

  return (
    <ScreenWrapper>
      <SectionBox>
        <ScreenTitle content={`INV. BROJ: ${data?.item[0].inventory_number ?? ''} - ${data?.item[0].title ?? ''}`} />
        <Divider color={Theme.palette.black} style={{marginBottom: 22, marginTop: 10}} />

        <InventoryDetailsWrapper>
          {type === 'movable' && (
            <MovableDetailsForm
              context={context}
              data={data ? data.item[0] : null}
              inventoryType={type}
              refetch={refetch}
              inventoryId={id}
            />
          )}
          {type === 'immovable' && (
            <ImmovableDetailsForm
              context={context}
              data={data ? data.item[0] : null}
              inventoryType={type}
              refetch={refetch}
              inventoryId={id}
            />
          )}
          {type === 'small' && (
            <SmallDetailsForm
              context={context}
              data={data ? data.item[0] : null}
              inventoryType={type}
              refetch={refetch}
              inventoryId={id}
            />
          )}
          {type !== 'small' && (
            <div>
              <TableHeader>
                <Typography variant="caption" content="estimations" />
                <PlusButton
                  disabled={data?.item[0].source_type?.includes('2')}
                  onClick={() => setAssessmentModal(true)}
                />
              </TableHeader>
              <Table
                tableHeads={getUpdatedTableHeads}
                data={data?.item[0].assessments || []}
                tableActions={[
                  {
                    name: 'print',
                    icon: <PrinterIcon stroke={Theme.palette.gray600} />,
                    onClick: () => {
                      console.log('printed estimation');
                    },
                  },
                ]}
              />
            </div>
          )}

          <div>
            <TableHeader>
              <Typography variant="caption" content="asset movements" />
              <PlusButton onClick={() => setMovementModal(true)} />
            </TableHeader>
            <Table
              tableHeads={movementsTableHeads}
              data={data?.item[0].movements || []}
              tableActions={[
                {
                  name: 'print',
                  icon: <PrinterIcon stroke={Theme.palette.gray600} />,
                  onClick: () => {
                    console.log('printed movement');
                  },
                },
              ]}
            />
          </div>
          {assessmentModal && (
            <AssessmentModal refetch={refetch} onClose={() => setAssessmentModal(false)} context={context} id={id} />
          )}
          {movementModal && (
            <MovementModal
              context={context}
              onClose={onCloseMovementModal}
              id={id}
              refetch={refetch}
              sourceType={data?.item[0].source_type}
              inventoryType={type}
            />
          )}
        </InventoryDetailsWrapper>
      </SectionBox>
    </ScreenWrapper>
  );
};

export default InventoryDetails;
