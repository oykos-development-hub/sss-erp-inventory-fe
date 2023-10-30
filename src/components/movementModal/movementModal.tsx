import {Datepicker, Dropdown, Modal} from 'client-library';
import {useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import useDispatchInsert from '../../services/graphQL/dispatchInsert/useDispatchInsert';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import useOrganizationUnits from '../../services/graphQL/organizationUnits/useOrganizationUnits';
import useUserProfiles from '../../services/graphQL/userProfileOverview/useUserProfileOverview';
import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {DispatchType} from '../../types/graphQL/inventoryDispatch';
import {InventoryItem, SourceType} from '../../types/graphQL/inventoryOverview';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {MicroserviceProps} from '../../types/micro-service-props';
import {parseDate, parseDateForBackend} from '../../utils/dateUtils';
import {immovableTransactionOptions, movableTransactionOptions, smallTransactionOptions} from './constants';
import {MovementForm} from './styles';
import ReceiveInventoryModal from '../receiveInventoryModal/receiveInventoryModal';

interface MovementModalProps {
  context: MicroserviceProps;
  onClose: (resetCheckboxes?: boolean) => void;
  id: number[];
  initialDispatchType?: DispatchType | `${DispatchType}`;
  sourceType?: SourceType | `${SourceType}`;
  refetch: () => void;
  returnOrgUnitId?: number;
  inventoryType: InventoryTypeEnum | `${InventoryTypeEnum}`;
  currentItem?: InventoryItem;
  status: string;
  openReceiveModal?: (id: number) => void;
}

const initialFormData: MovementModalForm = {
  transaction: null,
  target_user_profile_id: null,
  target_organization_unit_id: null,
  office_id: null,
  serial_number: '',
  date: new Date(),
};

interface MovementModalForm {
  transaction: DropdownDataString | null;
  target_user_profile_id: DropdownDataNumber | null;
  target_organization_unit_id?: DropdownDataNumber | null;
  office_id: DropdownDataNumber | null;
  serial_number: string;
  date: Date;
}

const MovementModal = ({
  context,
  onClose,
  initialDispatchType,
  sourceType,
  id,
  refetch,
  returnOrgUnitId,
  inventoryType,
  currentItem,
  status,
  openReceiveModal,
}: MovementModalProps) => {
  const {
    handleSubmit,
    formState: {errors, isValid},
    control,
    watch,
    setValue,
  } = useForm<MovementModalForm>({
    defaultValues: initialFormData,
  });

  const {alert} = context;
  const orgUnitId = context.contextMain.organization_unit.id;

  const {options: officeOptions} = useOrgUnitOfficesGet({page: 1, size: 1000, organization_unit_id: Number(orgUnitId)});
  const {options: locationOptions} = useOrganizationUnits(true);
  const {options: userOptions} = useUserProfiles({page: 1, size: 1000, organization_unit_id: orgUnitId});

  const {mutate, loading: isSaving} = useDispatchInsert();

  const onSubmit = (values: MovementModalForm) => {
    if (isValid && !isSaving) {
      const data = {
        source_user_profile_id: 1,
        target_user_profile_id: values.target_user_profile_id?.id ?? 0,
        source_organization_unit_id: orgUnitId,
        target_organization_unit_id: values.target_organization_unit_id?.id ?? 0,
        serial_number: '',
        office_id: values.office_id?.id ?? 0,
        type: (values.transaction?.id as DispatchType) ?? DispatchType.return,
        dispatch_description: '',
        inventory_id: id,
        inventory_type: 'movable',
        date: parseDateForBackend(values?.date),
      };
      try {
        const successTypeString =
          initialDispatchType === 'revers' ? 'revers' : initialDispatchType === 'allocation' ? 'kretanje' : 'povrat';
        const errorTypeString =
          initialDispatchType === 'revers' ? 'revers' : initialDispatchType === 'allocation' ? 'kretanja' : 'povrata';

        mutate(
          data,
          id => {
            alert.success(`Uspješno ste izvršili ${successTypeString}`);
            onClose(initialDispatchType === 'revers');
            if (initialDispatchType === 'revers' && openReceiveModal) openReceiveModal(id);
            refetch();
          },
          () => {
            alert.error(`Došlo je do greške prilikom ${errorTypeString} sredstva.`);
          },
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const isReversDone = (row: InventoryItem) => {
    return (
      row.source_type?.includes('1') &&
      row.organization_unit?.id !== row.target_organization_unit?.id &&
      row.target_organization_unit !== null
    );
  };

  const transactionOptionsToShow = useMemo(() => {
    const options =
      inventoryType === 'movable'
        ? movableTransactionOptions
        : inventoryType === 'immovable'
        ? immovableTransactionOptions
        : smallTransactionOptions;

    return options.filter(option => {
      const optionsToRemove = ['return'];

      if (sourceType?.includes('2') || (currentItem && isReversDone(currentItem))) {
        optionsToRemove.push('revers');
      }
      if (sourceType?.includes('1')) {
        optionsToRemove.push('return-revers');
      }

      return optionsToRemove.every(optionToRemove => optionToRemove !== option.id);
    });
  }, [sourceType, inventoryType, initialDispatchType]);

  const transactionType = watch('transaction')?.id;

  useEffect(() => {
    if (initialDispatchType) {
      setValue(
        'transaction',
        initialDispatchType ? transactionOptionsToShow.find(option => option.id === initialDispatchType)! : null,
      );
    }
  }, [initialDispatchType, transactionOptionsToShow]);

  useEffect(() => {
    if (locationOptions.length && initialDispatchType && returnOrgUnitId && initialDispatchType === 'return-revers') {
      setValue('target_organization_unit_id', locationOptions.find(option => option.id === returnOrgUnitId)!);
    }
  }, [returnOrgUnitId, initialDispatchType, locationOptions]);

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="KRETANJE SREDSTVA"
      leftButtonOnClick={onClose}
      rightButtonOnClick={handleSubmit(onSubmit)}
      rightButtonText={'Sačuvaj'}
      buttonLoading={isSaving}
      leftButtonText="Otkaži"
      content={
        <MovementForm>
          {status == 'Lager' && (
            <Controller
              name="transaction"
              control={control}
              rules={{required: 'Ovo polje je obavezno'}}
              render={({field: {name, value, onChange}}) => (
                <Dropdown
                  name={name}
                  value={value}
                  onChange={onChange}
                  options={transactionOptionsToShow}
                  label="TIP KRETANJA:"
                  error={errors.transaction?.message}
                />
              )}
            />
          )}
          {transactionType === 'revers' && (
            <Controller
              name="target_organization_unit_id"
              control={control}
              rules={{required: 'Ovo polje je obavezno'}}
              render={({field: {name, value, onChange}}) => (
                <Dropdown
                  name={name}
                  value={value}
                  onChange={onChange}
                  options={locationOptions}
                  label="LOKACIJA:"
                  error={errors.target_organization_unit_id?.message}
                />
              )}
            />
          )}

          {transactionType === 'allocation' && (
            <Controller
              name="target_user_profile_id"
              control={control}
              rules={{required: 'Ovo polje je obavezno'}}
              render={({field: {name, value, onChange}}) => (
                <Dropdown
                  name={name}
                  value={value}
                  onChange={onChange}
                  options={userOptions}
                  label="PRIMALAC:"
                  error={errors.target_user_profile_id?.message}
                />
              )}
            />
          )}
          {transactionType === 'allocation' && (
            <Controller
              name="office_id"
              control={control}
              rules={{required: 'Ovo polje je obavezno'}}
              render={({field: {name, value, onChange}}) => (
                <Dropdown
                  name={name}
                  value={value}
                  onChange={onChange}
                  options={officeOptions}
                  label="LOKACIJA:"
                  error={errors.office_id?.message}
                />
              )}
            />
          )}
          {(transactionType || status == 'Zadužen') && (
            <Controller
              name="date"
              control={control}
              rules={{required: 'Ovo polje je obavezno'}}
              render={({field: {name, value, onChange}}) => (
                <Datepicker
                  onChange={onChange}
                  label={`DATUM ${
                    status == 'Zadužen' ? 'RAZDUŽENJA' : transactionType === 'revers' ? 'REVERSA' : 'ZADUŽENJA'
                  }:`}
                  name={name}
                  value={value ? parseDate(value) : ''}
                  error={errors.date?.message}
                />
              )}
            />
          )}
        </MovementForm>
      }
    />
  );
};

export default MovementModal;
