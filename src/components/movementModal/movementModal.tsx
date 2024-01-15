import {Datepicker, Dropdown, Modal, FileUpload, Typography} from 'client-library';
import {useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import useDispatchInsert from '../../services/graphQL/dispatchInsert/useDispatchInsert';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import useOrganizationUnits from '../../services/graphQL/organizationUnits/useOrganizationUnits';
import useUserProfiles from '../../services/graphQL/userProfileOverview/useUserProfileOverview';
import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {InventoryDetails} from '../../types/graphQL/inventoryDetails';
import {DispatchType} from '../../types/graphQL/inventoryDispatch';
import {InventoryItem, SourceType} from '../../types/graphQL/inventoryOverview';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {MicroserviceProps} from '../../types/micro-service-props';
import {parseDateForBackend} from '../../utils/dateUtils';
import {immovableTransactionOptions, movableTransactionOptions, smallTransactionOptions} from './constants';
import {FileUploadWrapper, MovementForm} from './styles';
import {StatusesForMovableInventory} from '../../constants';

interface MovementModalProps {
  context: MicroserviceProps;
  onClose: (resetCheckboxes?: boolean) => void;
  id: number[];
  initialDispatchType?: DispatchType | `${DispatchType}`;
  sourceType?: SourceType | `${SourceType}`;
  refetch: () => void;
  returnOrgUnitId?: number;
  inventoryType: InventoryTypeEnum | `${InventoryTypeEnum}`;
  currentItem?: InventoryItem | InventoryDetails;
  status: string;
  openReceiveModal?: (id: number) => void;
  minDate?: string;
}

const initialFormData: MovementModalForm = {
  transaction: null,
  target_user_profile_id: null,
  target_organization_unit_id: null,
  office_id: null,
  serial_number: '',
  date: new Date(),
  file_id: 0,
};

interface MovementModalForm {
  transaction: DropdownDataString | null;
  target_user_profile_id: DropdownDataNumber | null;
  target_organization_unit_id?: DropdownDataNumber | null;
  office_id: DropdownDataNumber | null;
  serial_number: string;
  date: Date;
  file_id?: number;
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
  minDate,
}: MovementModalProps) => {
  const {
    handleSubmit,
    formState: {errors, isValid},
    control,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<MovementModalForm>({
    defaultValues: initialFormData,
  });

  const {
    alert,
    fileService: {uploadFile},
  } = context;
  const orgUnitId = context.contextMain.organization_unit.id;
  const type = context.navigation.location.pathname.split('/')[2] === 'movable-inventory' ? 'movable' : 'immovable';
  const {options: officeOptions} = useOrgUnitOfficesGet({page: 1, size: 1000, organization_unit_id: Number(orgUnitId)});
  const {options: locationOptions} = useOrganizationUnits(true);
  const {options: userOptions} = useUserProfiles({page: 1, size: 1000, organization_unit_id: orgUnitId});
  const [files, setFiles] = useState<FileList | null>(null);

  const {mutate, loading: isSaving} = useDispatchInsert();

  const onSubmit = async (values: MovementModalForm) => {
    if (isValid && !isSaving) {
      if (files && files.length) {
        const formData = new FormData();
        const fileArray = Array.from(files);

        formData.append('file', fileArray[0]);

        await uploadFile(
          formData,
          (res: any) => {
            setFiles(null);
            setValue('file_id', res[0]?.id);
            handleDispatchInsert(values);
          },
          () => {
            context?.alert.error('Greška pri čuvanju! Fajlovi nisu učitani.');
          },
        );

        return;
      } else {
        handleDispatchInsert(values);
      }
    }
  };

  const handleDispatchInsert = async (values: MovementModalForm) => {
    const file_id = watch('file_id');

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
      inventory_type: type,
      date: parseDateForBackend(values?.date),
      file_id: file_id,
    };

    if (transactionType === DispatchType.returnRevers && currentItem?.organization_unit?.id) {
      data.target_organization_unit_id = currentItem?.organization_unit?.id;
    }
    try {
      const successTypeString =
        transactionType === DispatchType.revers
          ? 'kreirali revers'
          : transactionType === DispatchType.allocation
          ? 'izvršili kretanje'
          : transactionType === DispatchType.convert
          ? 'izvršili konvertovanje PS2 sredstva u PS1'
          : 'izvršili povrat';
      const errorTypeString =
        transactionType === DispatchType.revers
          ? DispatchType.revers
          : transactionType === DispatchType.allocation
          ? 'kretanja'
          : transactionType === DispatchType.convert
          ? 'konvertovanje'
          : 'povrata';
      mutate(
        data,
        id => {
          if (initialDispatchType !== DispatchType.revers) alert.success(`Uspješno ste  ${successTypeString}`);
          onClose(initialDispatchType === DispatchType.revers);
          if (initialDispatchType === DispatchType.revers && openReceiveModal) openReceiveModal(id);
          refetch();
        },
        () => {
          alert.error(`Došlo je do greške prilikom ${errorTypeString} sredstva.`);
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  const isReversDone = (row: InventoryItem | InventoryDetails) => {
    return (
      row.source_type?.includes('1') &&
      row.organization_unit?.id !== row.target_organization_unit?.id &&
      row.target_organization_unit?.id !== 0
    );
  };

  const transactionOptionsToShow = useMemo(() => {
    const options =
      inventoryType === 'movable'
        ? movableTransactionOptions
        : inventoryType === 'immovable'
        ? immovableTransactionOptions
        : smallTransactionOptions;

    const optionsToRemove = [
      currentItem?.status === StatusesForMovableInventory.NEZADUZENO ? DispatchType.return : DispatchType.allocation,
    ];

    if (!currentItem?.is_external_donation && initialDispatchType !== DispatchType.convert)
      optionsToRemove.push(DispatchType.convert);

    if (
      sourceType?.includes('2') ||
      currentItem?.source_type.includes('2') ||
      (currentItem && isReversDone(currentItem)) ||
      currentItem?.status === StatusesForMovableInventory.ZADUZENO ||
      currentItem?.is_external_donation ||
      initialDispatchType === DispatchType.convert
    ) {
      optionsToRemove.push(DispatchType.revers);
    }

    if (
      sourceType?.includes('1') ||
      currentItem?.status === StatusesForMovableInventory.ZADUZENO ||
      currentItem?.is_external_donation ||
      initialDispatchType === DispatchType.convert
    ) {
      optionsToRemove.push(DispatchType.returnRevers);
    }

    if (currentItem?.source_type?.includes('1') && currentItem?.status === StatusesForMovableInventory.NEZADUZENO) {
      optionsToRemove.push(DispatchType.returnRevers);
    }

    return options.filter(option => {
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
    if (minDate) {
      setValue('date', new Date(minDate));
    }
  }, [minDate]);

  useEffect(() => {
    if (
      locationOptions.length &&
      initialDispatchType &&
      returnOrgUnitId &&
      initialDispatchType === DispatchType.returnRevers
    ) {
      setValue('target_organization_unit_id', locationOptions.find(option => option.id === returnOrgUnitId)!);
    }
  }, [returnOrgUnitId, initialDispatchType, locationOptions]);

  const handleUpload = (files: FileList) => {
    const allowedSize = 1048576;
    if (files && files[0] && files[0].size > allowedSize) {
      setError('file_id', {type: 'custom', message: 'Maksimalna veličina fajla je 1MB.'});
      return;
    } else {
      setFiles(files);
      clearErrors('file_id');
      context.alert.success('Fajlovi uspješno učitani');
    }
  };

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
          {currentItem?.status !== StatusesForMovableInventory.ZADUZENO && !initialDispatchType && (
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
                  isRequired
                  error={errors.transaction?.message}
                />
              )}
            />
          )}

          {transactionType === DispatchType.revers && (
            <Controller
              name="target_organization_unit_id"
              control={control}
              rules={{required: 'Ovo polje je obavezno'}}
              render={({field: {name, value, onChange}}) => (
                <Dropdown
                  name={name}
                  value={value}
                  onChange={onChange}
                  options={locationOptions.filter(item => item.id !== orgUnitId)}
                  label="LOKACIJA:"
                  isRequired
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
                  isRequired
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
                  isRequired
                  error={errors.office_id?.message}
                />
              )}
            />
          )}
          {(transactionType || status === StatusesForMovableInventory.ZADUZENO) && (
            <Controller
              name="date"
              control={control}
              rules={{required: 'Ovo polje je obavezno'}}
              render={({field: {name, value, onChange}}) => (
                <>
                  <Datepicker
                    onChange={onChange}
                    label={`DATUM ${
                      status === StatusesForMovableInventory.ZADUZENO
                        ? 'RAZDUŽENJA'
                        : transactionType === 'return-revers'
                        ? 'POVRATA'
                        : transactionType === DispatchType.convert
                        ? 'KONVERTOVANJA'
                        : transactionType === DispatchType.revers
                        ? 'SLANJA'
                        : 'ZADUŽENJA'
                    }:`}
                    name={name}
                    minDate={minDate ? new Date(minDate) : undefined}
                    selected={value ? new Date(value) : ''}
                    isRequired
                    error={errors.date?.message}
                  />
                </>
              )}
            />
          )}
          {(status === StatusesForMovableInventory.ZADUZENO || transactionType === DispatchType.convert) && (
            <FileUploadWrapper>
              <FileUpload
                icon={<></>}
                variant="secondary"
                onUpload={handleUpload}
                note={<Typography variant="bodySmall" content="Fajlovi:" />}
                buttonText="Dodaj fajl"
                files={files}
              />
            </FileUploadWrapper>
          )}
        </MovementForm>
      }
    />
  );
};

export default MovementModal;
