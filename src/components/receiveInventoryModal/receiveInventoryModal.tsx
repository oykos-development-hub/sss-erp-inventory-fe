import {Modal, Table, Typography} from 'client-library';
import {PAGE_SIZE} from '../../constants';
import useDispatchAccept from '../../services/graphQL/inventoryDispatchAccept/useInventoryDispatchAccept';
import useInventoryDispatchOverview from '../../services/graphQL/inventoryDispatchOverview/useInventoryDispatchOverview';
import UseDispatchDelete from '../../services/graphQL/inventoryDispatchReject/useInventoryDispatchDelete';
import {MicroserviceProps} from '../../types/micro-service-props';
import {receiveModalTableHeads} from './constants';

export enum ReceiveType {
  revers = 'revers',
  returnRevers = 'return-revers',
}

interface ReceiveInventoryModalProps {
  onClose: () => void;
  id?: number;
  context: MicroserviceProps;
  refetch: () => void;
}

const ReceiveInventoryModal = ({onClose, id, context, refetch}: ReceiveInventoryModalProps) => {
  const orgUnit = context.contextMain.organization_unit.title;
  const {alert} = context;

  const {data: response, loading} = useInventoryDispatchOverview({page: 0, size: PAGE_SIZE, id: id ?? 0});
  const data = response.items[0];

  const {mutate: acceptDispatch, loading: isSaving} = useDispatchAccept(context);
  const {mutate: rejectDispatch, loading: isRejectSaving} = UseDispatchDelete();

  const onAccept = async () => {
    await acceptDispatch(
      data.id,
      1,
      () => {
        alert.success('Uspešno ste prihvatili revers');
      },
      () => {
        alert.error('Došlo je do greške prilikom prihvatanja reversa');
      },
    );
    refetch();
    onClose();
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
      onClose={onClose}
      title={`Revers broj: ${data?.id}`}
      leftButtonOnClick={onReject}
      rightButtonOnClick={onAccept}
      buttonLoading={isSaving || isRejectSaving}
      rightButtonText="Accept all"
      leftButtonText="Reject all"
      content={
        <>
          {data?.type === 'revers' && (
            <>
              <Typography
                variant="bodyMedium"
                content={`Potvrđujem da sam od: ${data?.target_organization_unit.title}`}
              />
              <Typography variant="bodySmall" content={`Primio na potrebu za: ${orgUnit}`} />
            </>
          )}
          <Table isLoading={loading} tableHeads={receiveModalTableHeads} data={data?.inventory ?? []} />
        </>
      }
      customButtonsControls={data?.type === 'return-revers' ? <></> : undefined}
    />
  );
};

export default ReceiveInventoryModal;
