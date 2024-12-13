import {Button, Dropdown, Input, Datepicker} from 'client-library';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {DetailsFormProps} from '../../screens/inventoryDetails/types';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {InventoryInsertData} from '../../types/graphQL/inventoryOverview';
import {parseDateForBackend} from '../../utils/dateUtils';
import {initialValues, optionsOne, optionsThree, optionsTwo} from './constants';
import {ButtonWrapper, FormWrapper, InputWrapper, OfficeDropdown, SupplierDropdown} from './style';
import {MovableDetailsFormProps} from './types';
import FileList from '../fileList/fileList';
import {checkActionRoutePermissions} from '../../services/checkRoutePermissions.ts';
import {InventoryInsertResponse} from '../../types/graphQL/inventoryInsert.ts';

const MovableDetailsForm = ({data, context, inventoryType, refetch, inventoryId}: DetailsFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
    watch,
    setValue,
    setError,
  } = useForm<MovableDetailsFormProps>({defaultValues: initialValues});

  const {suppliers} = useSuppliersOverview();

  const {
    alert,
    navigation: {navigate},
    contextMain: {permissions},
  } = context;

  const updatePermittedRoutes = checkActionRoutePermissions(permissions, 'update');
  const updatePermission = updatePermittedRoutes.includes('/inventory/movable-inventory');

  const {mutate, loading} = useInventoryInsert();

  useEffect(() => {
    if (data) {
      reset(data as any);
    }
  }, [data]);

  const onSubmit = async (values: MovableDetailsFormProps) => {
    const movableDetailsValues: InventoryInsertData[] = [
      {
        id: inventoryId,
        type: inventoryType,
        class_type_id: values?.class_type?.id || 0,
        depreciation_type_id: values?.depreciation_type?.id || 0,
        supplier_id: values?.supplier?.id || 0,
        serial_number: values?.serial_number || '',
        inventory_number: values?.inventory_number || '',
        title: values?.title || '',
        abbreviation: '',
        internal_ownership: true,
        office_id: values?.office?.id || 0,
        organization_unit_id: data?.organization_unit?.id,
        location: '',
        target_user_profile_id: values?.target_user_profile_id || 0,
        target_organization_unit_id: data?.target_organization_unit?.id || 0,
        unit: values?.unit || '',
        amount: values?.amount || 0,
        net_price: 0,
        gross_price: values?.gross_price || 0,
        description: values?.description || '',
        date_of_purchase: parseDateForBackend(new Date(values?.date_of_purchase)),
        source: '',
        donor_title: '',
        invoice_number: '',
        price_of_assessment: 0,
        date_of_assessment: parseDateForBackend(new Date()),
        lifetime_of_assessment_in_months: values?.lifetime_of_assessment_in_months || 0,
        active: true,
        deactivation_description: 0,
        invoice_file_id: 0,
        file_id: 0,
        donation_description: values?.donation_description || '',
        donation_files: values?.donation_files.map(file => file.id) || [],
      },
    ];

    await mutate(
      movableDetailsValues,
      () => {
        alert.success('Sredstvo uspješno sačuvano');
        refetch && refetch();
        navigate(-1);
      },
      (response: InventoryInsertResponse) => {
        if (response?.validator?.length) {
          setDuplicateErrors(response.validator);
          return;
        }
        alert.error('Neuspješno dodavanje osnovnih sredstava');
      },
    );
  };

  const setDuplicateErrors = (validator: InventoryInsertResponse['validator']) => {
    if (validator.length) {
      validator.forEach(item => {
        if (item.entity === 'inventory_number') {
          setError('inventory_number', {message: 'Inventarski broj već postoji'});
        }
        if (item.entity === 'serial_number') {
          setError('serial_number', {message: 'Serijski broj već postoji'});
        }
      });
    }
  };

  const price: number = watch('gross_price') || 0;
  const amortizationValue: number = watch('amortization_value') || 0;

  useEffect(() => {
    const formattedAmortization = amortizationValue.toFixed(2);
    const formattedPrice = price.toFixed(2);

    setValue('amortization_value', Number(formattedAmortization));
    setValue('gross_price', Number(formattedPrice));
  }, [amortizationValue, price, setValue]);

  return (
    <FormWrapper>
      <InputWrapper>
        <Input
          {...register('inventory_number', {
            required: 'Ovo polje je obavezno',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Dozvoljen je samo unos brojeva.',
            },
          })}
          disabled={!updatePermission}
          isRequired
          error={errors.inventory_number?.message}
          label="INV. BROJ:"
        />
        <Input
          {...register('title', {required: 'Ovo polje je obavezno'})}
          isRequired
          error={errors.title?.message}
          label="NAZIV:"
          disabled
        />
        <Input
          {...register('serial_number', {required: 'Ovo polje je obavezno'})}
          isRequired
          error={errors.serial_number?.message}
          label="SERIJSKI BR:"
          disabled={!updatePermission}
        />
        <Controller
          name="class_type"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={optionsOne}
              label="KLASA SREDSTAVA:"
              isDisabled={true}
            />
          )}
        />

        <Controller
          name="depreciation_type"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={optionsTwo}
              label="AMORTIZACIONA GRUPA:"
              isDisabled={true}
            />
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Input
          {...register('purchase_gross_price')}
          type="number"
          label="NABAVNA CIJENA:"
          disabled={true}
          rightContent={<div>€</div>}
        />
        <Input
          {...register('gross_price')}
          type="number"
          label="TRENUTNA CIJENA:"
          disabled={true}
          rightContent={<div>€</div>}
        />
        <Input {...register('lifetime_of_assessment_in_months')} label="VIJEK TRAJANJA:" disabled={true} />
        <Input {...register('depreciation_rate')} label="AMORTIZACIONA STOPA:" disabled={true} />
        <Input {...register('amortization_value')} label="VRIJEDNOST AMORTIZACIJE:" disabled={true} />
      </InputWrapper>

      <InputWrapper>
        <Controller
          name="supplier"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <SupplierDropdown
              name={name}
              value={value}
              onChange={onChange}
              options={suppliers}
              isDisabled={true}
              label="DOBAVLJAČ:"
            />
          )}
        />

        <Controller
          name="office"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <OfficeDropdown
              name={name}
              value={value}
              onChange={onChange}
              options={optionsThree}
              label="LOKACIJA:"
              isDisabled={true}
            />
          )}
        />

        <Input {...register('description')} label="NAPOMENA:" disabled={!updatePermission} />
        <Input {...register('residual_price')} disabled={true} label="REZIDUALNA VRIJEDNOST:" />
        <Controller
          name="date_of_purchase"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Datepicker
              name={name}
              selected={value ? new Date(value) : ''}
              onChange={onChange}
              placeholder=""
              label="DATUM NABAVKE:"
              isRequired
              error={errors.date_of_assessment?.message}
              disabled={true}
            />
          )}
        />
      </InputWrapper>
      {data?.source === 'donacija' && (
        <div>
          <Input
            textarea
            {...register('donation_description')}
            label="NAPOMENA ZA DONACIJU:"
            style={{marginBlock: 15}}
            disabled={!updatePermission}
          />
          <FileList files={data?.donation_files || []} />
        </div>
      )}

      <ButtonWrapper>
        <Button content="Nazad" onClick={() => navigate(-1)} />
        {updatePermission && <Button content="Sačuvaj" onClick={handleSubmit(onSubmit)} isLoading={loading} />}
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default MovableDetailsForm;
