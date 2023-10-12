import {Button, Input, Dropdown} from 'client-library';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {DetailsFormProps} from '../../screens/inventoryDetails/types';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {parseDate} from '../../utils/dateUtils';
import {initialValues, optionsOne, optionsThree, optionsTwo} from './constants';
import {ButtonWrapper, FormWrapper, InputWrapper, OfficeDropdown, SupplierDropdown} from './style';
import {MovableDetailsFormProps} from './types';
import {InventoryInsertData} from '../../types/graphQL/inventoryOverview';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';

const MovableDetailsForm = ({data, context, inventoryType, refetch, inventoryId}: DetailsFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<MovableDetailsFormProps>({defaultValues: initialValues});

  const {suppliers} = useSuppliersOverview();

  const {
    alert,
    navigation: {navigate},
  } = context;

  const {mutate} = useInventoryInsert();

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
        location: '',
        target_user_profile_id: values?.target_user_profile_id || 0,
        unit: values?.unit || '',
        amount: values?.amount || 0,
        net_price: 0,
        gross_price: values?.gross_price || 0,
        description: values?.description || '',
        date_of_purchase: parseDate(values?.date_of_purchase, true) || '',
        source: '',
        donor_title: '',
        invoice_number: '',
        price_of_assessment: 0,
        date_of_assessment: '',
        lifetime_of_assessment_in_months: values?.lifetime_of_assessment_in_months || 0,
        active: true,
        deactivation_description: 0,
        invoice_file_id: 0,
        file_id: 0,
      },
    ];
    await mutate(
      movableDetailsValues,
      () => {
        alert.success('Sredstvo uspješno sačuvano');
        refetch && refetch();
        navigate(-1);
      },

      () => alert.error('Greška prilikom dodavanja sredstva'),
    );
  };

  return (
    <FormWrapper>
      <InputWrapper>
        <Input
          {...register('inventory_number', {required: 'Ovo polje je obavezno'})}
          error={errors.inventory_number?.message}
          label="INV. BROJ:"
        />
        <Input
          {...register('title', {required: 'Ovo polje je obavezno'})}
          error={errors.title?.message}
          label="NAZIV:"
        />
        <Input
          {...register('serial_number', {required: 'Ovo polje je obavezno'})}
          error={errors.serial_number?.message}
          label="SERIJSKI BR:"
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
        <Input {...register('gross_price')} type="number" label="CIJENA:" disabled={true} />
        <Input {...register('lifetime_of_assessment_in_months')} label="VIJEK TRAJANJA:" disabled={true} />

        <Controller
          name="depreciation_type"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={optionsThree}
              label="AMORTIZACIONA STOPA:"
              isDisabled={true}
            />
          )}
        />
        <Input {...register('amount')} label="UKUPNA VRIJEDNOST AMORTIZACIJE:" disabled={true} />

        <Input {...register('description')} label="NAPOMENA:" />
      </InputWrapper>

      <InputWrapper>
        <Controller
          name="supplier"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <SupplierDropdown name={name} value={value} onChange={onChange} options={suppliers} label="DOBAVLJAČ:" />
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
      </InputWrapper>

      <ButtonWrapper>
        <Button content="Back" onClick={() => navigate(-1)} />
        <Button content="Save Changes" onClick={handleSubmit(onSubmit)} />
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default MovableDetailsForm;
