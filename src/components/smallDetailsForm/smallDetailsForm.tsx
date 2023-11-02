import {Button, Dropdown, Input, Datepicker} from 'client-library';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import {DetailsFormProps} from '../../screens/inventoryDetails/types';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {parseDate, parseDateForBackend} from '../../utils/dateUtils';
import {initialValues, unitOptions} from './constants';
import {
  ButtonWrapper,
  DescriptionInput,
  LocationDropdown,
  SmallDetailsFormWrapper,
  SmallDetailsInputWrapper,
  SupplierDropdown,
  SupplierLocationDescriptionWrapper,
} from './style';
import {SmallDetailsFormProps} from './types';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';

const SmallDetailsForm = ({context, data, inventoryType, refetch, inventoryId}: DetailsFormProps) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: {errors},
  } = useForm<SmallDetailsFormProps>({defaultValues: initialValues});

  const {suppliers} = useSuppliersOverview();

  const {
    alert,
    navigation: {navigate},
  } = context;

  const {mutate} = useInventoryInsert();

  useEffect(() => {
    if (data) {
      const currentData = {
        ...data,
        source: inventorySourceOptions.find(option => option.id === data?.source),
        unit: unitOptions.find(option => option.id === data?.unit),
        description: data?.description,
      };

      reset(currentData as any);
    }
  }, [data]);

  const onSubmit = (values: SmallDetailsFormProps) => {
    const smallDetailsValues = [
      {
        id: inventoryId,
        type: inventoryType,
        class_type_id: values?.class_type?.id || 0,
        depreciation_type_id: 0,
        supplier_id: values?.supplier?.id || 0,
        real_estate: undefined,
        title: values?.title || '',
        abbreviation: '',
        internal_ownership: true,
        office_id: values?.office?.id || 0,
        source: values?.source?.id || '',
        donor_title: '',
        invoice_number: values?.invoice_number || '',
        date_of_purchase: parseDateForBackend(new Date(values?.date_of_purchase)) || '',
        gross_price: values?.gross_price || 0,
        amount: values?.amount || 0,
        description: values?.description || '',
        unit: values?.unit?.id || '',
        location: values?.location?.id || '',
        active: true,
        target_user_profile_id: data?.target_user_profile?.id,
        net_price: 0,
        lifetime_of_assessment_in_months: 0,
        file_id: 0,
        deactivation_description: 0,
        invoice_file_id: 0,
        organization_unit_id: data?.organization_unit?.id,
      },
    ];

    mutate(
      smallDetailsValues,
      () => {
        alert.success('Sredstvo uspješno sačuvano');
        refetch && refetch();
        navigate(-1);
      },
      () => alert.error('Greška prilikom dodavanja sredstva'),
    );
  };

  return (
    <SmallDetailsFormWrapper>
      <SmallDetailsInputWrapper>
        <Input
          {...register('title', {required: 'Ovo polje je obavezno'})}
          error={errors.title?.message}
          label="NAZIV:"
        />
        <Controller
          name="supplier"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <LocationDropdown name={name} value={value} onChange={onChange} options={suppliers} label="DOBAVLJAČ" />
          )}
        />
        <Input {...register('purchase_gross_price')} label="CIJENA:" disabled={true} />
        <Controller
          name="office"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <SupplierDropdown
              name={name}
              value={value}
              onChange={onChange}
              options={[]}
              isDisabled={true}
              label="LOKACIJA:"
            />
          )}
        />
        {/* 
       
       

         */}
      </SmallDetailsInputWrapper>
      <SmallDetailsInputWrapper>
        <Input
          {...register('invoice_number', {required: 'Ovo polje je obavezno'})}
          error={errors.invoice_number?.message}
          label="BROJ RAČUNA NABAVKE:"
        />
        <Controller
          name="date_of_purchase"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Datepicker
              name={name}
              value={value ? parseDate(value) : ''}
              onChange={onChange}
              options={[]}
              label="DATUM NABAVKE:"
            />
          )}
        />
        <Controller
          name="source"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={inventorySourceOptions}
              label="IZVOR SREDSTAVA:"
            />
          )}
        />
        <Controller
          name="class_type"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={[]}
              isDisabled={true}
              label="KLASA SREDSTAVA:"
            />
          )}
        />
      </SmallDetailsInputWrapper>
      <SmallDetailsInputWrapper>
        <Controller
          name="unit"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown name={name} value={value} onChange={onChange} options={unitOptions} label="JEDINICA MJERE:" />
          )}
        />
        <Input
          {...register('amount', {required: 'Ovo polje je obavezno'})}
          type="number"
          error={errors.amount?.message}
          label="KOLIČINA:"
        />
        <SupplierLocationDescriptionWrapper>
          <DescriptionInput {...register('description')} label="NAPOMENA:" />
        </SupplierLocationDescriptionWrapper>
      </SmallDetailsInputWrapper>

      <ButtonWrapper>
        <Button content="Nazad" onClick={() => navigate(-1)} />
        <Button content="Sačuvaj" onClick={handleSubmit(onSubmit)} />
      </ButtonWrapper>
    </SmallDetailsFormWrapper>
  );
};

export default SmallDetailsForm;
