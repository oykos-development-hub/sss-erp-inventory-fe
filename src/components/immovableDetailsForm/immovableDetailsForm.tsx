import {Button, Dropdown, Input} from 'client-library';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {donationOptions, restrictionOptions} from '../../screens/inventoryAdd/constants';
import {DetailsFormProps} from '../../screens/inventoryDetails/types';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {parseDateForBackend} from '../../utils/dateUtils';
import {ButtonWrapper} from '../movableDetailsForm/style';
import {depreciationTypeOptions, initialValues, ownershipTypeOptions} from './constants';
import {ImmovableDetailsFormWrapper, ImmovableDetailsInputWrapper} from './style';
import {ImmovableDetailsFormProps} from './types';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';

const ImmovableDetailsForm = ({context, data, refetch, inventoryId}: DetailsFormProps) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: {errors},
  } = useForm<ImmovableDetailsFormProps>({defaultValues: initialValues});

  const {
    alert,
    navigation: {navigate},
  } = context;
  const {mutate, loading} = useInventoryInsert();

  const {data: depreciationTypes} = useGetSettings({entity: 'deprecation_types'});
  const {limitation, is_external_donation} = watch();

  useEffect(() => {
    if (data) {
      const depreciationType = depreciationTypes?.items?.find(option => option.id === data?.depreciation_type?.id);

      const currentValues = {
        ...data,
        type: ownershipTypeOptions.find(option => option.id === data?.real_estate?.type_id),
        land_serial_number: data.real_estate?.land_serial_number,
        property_document: data.real_estate?.property_document,
        ownership_scope: data?.real_estate?.ownership_scope,
        ownership_investment_scope: data?.real_estate?.ownership_investment_scope,
        document: data.real_estate?.document,
        limitation: restrictionOptions.find(option => option.id === data?.real_estate?.limitation_id),
        limitations_description: data?.real_estate?.limitations_description,
        square_area: data.real_estate?.square_area,
        depreciation_rate: depreciationType && depreciationType.value ? 100 / Number(depreciationType.value) : 0,
        is_external_donation: donationOptions.find(option => option.id === data?.is_external_donation),
        owner: data?.owner,
      };

      reset(currentValues as any);
    }
  }, [data]);

  const onSubmit = async (values: ImmovableDetailsFormProps) => {
    const immovableDetailsValues = [
      {
        id: inventoryId,
        type: InventoryTypeEnum.IMMOVABLE,
        internal_ownership: true,
        location: values?.location?.id || '',
        gross_price: values?.gross_price || 0,
        date_of_purchase: parseDateForBackend(new Date(values?.date_of_purchase)) || '',
        price_of_assessment: 0,
        active: true,
        deactivation_description: 0,
        invoice_file_id: values?.invoice_file_id || 0,
        organization_unit_id: data?.organization_unit?.id,
        real_estate: {
          id: data?.real_estate?.id || 0,
          square_area: values?.square_area || 0,
          land_serial_number: values?.land_serial_number || '',
          estate_serial_number: ' ',
          ownership_type: ' ',
          ownership_scope: values?.ownership_scope || '',
          ownership_investment_scope: values?.ownership_investment_scope || '',
          limitations_description: values?.limitations_description || '',
          file_id: 0,
          type_id: values?.type?.id || '',
          property_document: values?.property_document || '',
          limitation_id: values?.limitation?.id || false,
          document: values?.document || '',
          title: ' ',
        },
        depreciation_type_id: values?.depreciation_type?.id || 0,
        file_id: 0,
        donation_description: '',
        donation_files: [],
        is_external_donation: values?.is_external_donation?.id,
        owner: values?.owner || '',
        serial_number: '',
        inventory_number: '',
      },
    ];

    await mutate(
      immovableDetailsValues,
      () => {
        alert.success('Sredstvo uspješno sačuvano');
        refetch && refetch();
        navigate(-1);
      },
      () => alert.error('Greška prilikom dodavanja sredstva'),
    );
  };

  return (
    <ImmovableDetailsFormWrapper>
      <ImmovableDetailsInputWrapper>
        <Controller
          name="type"
          rules={{required: 'Ovo polje je obavezno'}}
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={ownershipTypeOptions}
              label="VRSTA NEPOKRETNOSTI:"
              isRequired
              error={errors.type?.message}
            />
          )}
        />
        <Input {...register('location')} label="LOKACIJA:" disabled={true} />
        <Input
          {...register('square_area', {required: 'Ovo polje je obavezno'})}
          type="number"
          isRequired
          error={errors.square_area?.message}
          label="POVRŠINA M2:"
        />
        <Input
          {...register('land_serial_number', {required: 'Ovo polje je obavezno'})}
          error={errors.land_serial_number?.message}
          isRequired
          label="BROJ KATASTARSKE PARCELE:"
        />
        <Input
          {...register('property_document', {required: 'Ovo polje je obavezno'})}
          error={errors.property_document?.message}
          isRequired
          label="ISPRAVE O SVOJINI:"
        />
      </ImmovableDetailsInputWrapper>
      <ImmovableDetailsInputWrapper>
        <Input
          {...register('ownership_scope', {required: 'Ovo polje je obavezno'})}
          label="OBIM PRAVA:"
          isRequired
          error={errors.ownership_scope?.message}
        />
        <Input
          {...register('ownership_investment_scope', {required: 'Ovo polje je obavezno'})}
          error={errors.ownership_investment_scope?.message}
          isRequired
          label="OBIM PRAVA ZA IMOVINU STEČENU ZAJEDNIČKIM ULAGANJEM:"
        />
        <Input
          {...register('document', {required: 'Ovo polje je obavezno'})}
          isRequired
          error={errors.document?.message}
          label="LIST NEPOKRETNOSTI:"
        />
      </ImmovableDetailsInputWrapper>
      <ImmovableDetailsInputWrapper>
        <Input
          {...register('purchase_gross_price')}
          label="NABAVNA VRIJEDNOST:"
          disabled={true}
          rightContent={<div>€</div>}
        />
        <Input {...register('gross_price')} label="TRENUTNA VRIJEDNOST:" disabled={true} rightContent={<div>€</div>} />

        <Controller
          name="limitation"
          rules={{required: 'Ovo polje je obavezno'}}
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={restrictionOptions}
              error={errors.limitation?.message}
              isRequired
              label="TERETI OGRANIČENJA:"
            />
          )}
        />

        <Input
          {...register('limitations_description')}
          error={errors.limitations_description?.message}
          disabled={!limitation?.id}
          isRequired
          label="OPIS TERETA OGRANIČENJA:"
        />
      </ImmovableDetailsInputWrapper>
      <ImmovableDetailsInputWrapper>
        <Controller
          name="depreciation_type"
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={depreciationTypeOptions}
              label="AMORTIZACIONA GRUPA:"
              isDisabled={true}
            />
          )}
        />
        <Input {...register('lifetime_of_assessment_in_months')} label="VIJEK TRAJANJA:" disabled={true} />
        <Input
          {...register('depreciation_rate')}
          label="AMORTIZACIONA STOPA:"
          disabled={true}
          rightContent={<div>%</div>}
        />
      </ImmovableDetailsInputWrapper>
      <ImmovableDetailsInputWrapper>
        <Controller
          name="is_external_donation"
          rules={{required: 'Ovo polje je obavezno'}}
          control={control}
          render={({field: {name, value, onChange}}) => (
            <Dropdown
              name={name}
              value={value}
              onChange={onChange}
              options={donationOptions}
              label="TIP SREDSTVA:"
              isDisabled
              isRequired
              error={errors.is_external_donation?.message}
            />
          )}
        />
        <Input
          {...register('owner')}
          label="VLASNIK:"
          disabled={is_external_donation ? true : false}
          isRequired
          error={errors.owner?.message}
        />
      </ImmovableDetailsInputWrapper>

      <ButtonWrapper>
        <Button content="Odustani" onClick={() => navigate(-1)} />
        <Button content="Sačuvaj" onClick={handleSubmit(onSubmit)} loader={loading} />
      </ButtonWrapper>
    </ImmovableDetailsFormWrapper>
  );
};

export default ImmovableDetailsForm;
