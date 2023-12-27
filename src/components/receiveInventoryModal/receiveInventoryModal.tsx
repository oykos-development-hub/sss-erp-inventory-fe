import {Modal, Table, Typography} from 'client-library';
import {PAGE_SIZE} from '../../constants';
import useDispatchAccept from '../../services/graphQL/inventoryDispatchAccept/useInventoryDispatchAccept';
import useInventoryDispatchOverview from '../../services/graphQL/inventoryDispatchOverview/useInventoryDispatchOverview';
import UseDispatchDelete from '../../services/graphQL/inventoryDispatchReject/useInventoryDispatchDelete';
import {MicroserviceProps} from '../../types/micro-service-props';
import {receiveModalTableHeads, receiveImmovableModalTableHeads} from './constants';

export enum ReceiveType {
  revers = 'revers',
  returnRevers = 'return-revers',
}

interface ReceiveInventoryModalProps {
  onClose: () => void;
  id?: number;
  context: MicroserviceProps;
  refetch: () => void;
  targetOrgID?: number;
  createRevers?: boolean;
  shouldGeneratePDF?: boolean;
}

const ReceiveInventoryModal = ({
  onClose,
  id,
  context,
  refetch,
  targetOrgID,
  createRevers,
  shouldGeneratePDF,
}: ReceiveInventoryModalProps) => {
  const orgUnitID = context.contextMain.organization_unit.id;
  const {
    alert,
    reportService: {generatePdf},
  } = context;

  const {data: response, loading} = useInventoryDispatchOverview({page: 0, size: PAGE_SIZE, id: id ?? 0});
  const data = response.items[0];
  const type = context.navigation.location.pathname.split('/')[2] === 'movable-inventory' ? 'movable' : 'immovable';

  const {mutate: acceptDispatch, loading: isSaving} = useDispatchAccept();
  const {mutate: rejectDispatch, loading: isRejectSaving} = UseDispatchDelete();

  const onAccept = async () => {
    if (targetOrgID != orgUnitID) {
      if (createRevers && shouldGeneratePDF) {
        generatePdf('REVERS', data);
      }
      onClose();
    } else {
      await acceptDispatch(
        data.id,
        () => {
          alert.success(createRevers ? '' : 'Uspješno ste prihvatili revers');
        },
        () => {
          alert.error('Došlo je do greške prilikom prihvatanja reversa');
        },
      );
      refetch();
      onClose();
    }
  };

  const onReject = async () => {
    await rejectDispatch(
      data.id,
      () => {
        alert.success('Uspešno ste odbili revers');
      },
      () => {
        alert.error('Došlo je do greške prilikom odbijanja reversa');
      },
    );
    refetch();
    onClose();
  };

  return (
    <Modal
      open={true}
      onClose={() => {
        if (createRevers) onReject();
        onClose();
      }}
      title={`Revers broj: ${data?.id}`}
      buttonLoading={isSaving || isRejectSaving}
      leftButtonOnClick={onReject}
      rightButtonOnClick={onAccept}
      rightButtonText="Prihvati"
      leftButtonText="Odbij"
      content={
        <>
          {data?.type === 'revers' && (
            <>
              <Typography
                variant="bodyMedium"
                content={
                  createRevers
                    ? 'Da li želite kreirati revers? Sredstvo će biti poslato odabranoj organizacionoj jedinici.'
                    : `Organizaciona jedinica ${data?.source_organization_unit?.title} je kreirala revers. ${
                        data?.is_accepted && 'Da li želite prihvatiti sredstvo?'
                      }`
                }
              />
            </>
          )}
          <Table
            isLoading={loading}
            tableHeads={type === 'immovable' ? receiveImmovableModalTableHeads : receiveModalTableHeads}
            data={data?.inventory ?? []}
          />
        </>
      }
      customButtonsControls={(targetOrgID != orgUnitID && !createRevers) || data?.is_accepted ? <></> : undefined}
    />
  );
};

export default ReceiveInventoryModal;
