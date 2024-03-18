import {Button, Dropdown, Input} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {donationOptions, propertyDocumentOptions, restrictionOptions} from '../../screens/inventoryAdd/constants';
import {ButtonContainer} from '../../screens/inventoryAdd/styles';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {FieldsContainer, Form, FormRow} from '../../shared/formStyles';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {MicroserviceProps} from '../../types/micro-service-props';
import {initialValues} from './constants';
import {ImmovableAddFormProps} from './types';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import {parseDateForBackend} from '../../utils/dateUtils';

const ImmovableAddForm = ({context}: {context: MicroserviceProps}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: {errors, isValid},
  } = useForm<ImmovableAddFormProps>({defaultValues: initialValues});

  const {
    alert,
    navigation: {navigate},
  } = context;

  const {options: amortizationGroupOptions} = useGetSettings({entity: 'deprecation_types'});
  const {options: realEstateTypeOptions} = useGetSettings({entity: 'real_estate_types'});

  const {mutate, loading} = useInventoryInsert();

  const propertyDocument = watch('property_document');

  const {limitation, is_external_donation} = watch();
  //handlers

  const addButtonClick = async (values: ImmovableAddFormProps) => {
    if (loading) return;
    if (isValid) {
      const data = [
        {
          type: InventoryTypeEnum.IMMOVABLE,
          internal_ownership: true,
          gross_price: values?.gross_price || 0,
          price_of_assessment: 0,
          active: true,
          deactivation_description: 0,
          date_of_assessment: parseDateForBackend(new Date()),
          date_of_purchase: parseDateForBackend(new Date()),
          location: values.location,
          real_estate: {
            id: 0,
            square_area: values?.square_area || 0,
            land_serial_number: values?.land_serial_number || '',
            estate_serial_number: '',
            ownership_type: '',
            ownership_scope: values?.ownership_scope || '',
            ownership_investment_scope: values?.ownership_investment_scope || '',
            limitations_description: values?.limitations_description || '',
            file_id: 0,
            type_id: values?.type_id?.title || '',
            property_document: values?.property_document?.id || '',
            limitation_id: values?.limitation?.id || false,
            document: values?.document || '',
            title: '',
          },
          depreciation_type_id: values?.depreciation_type?.id || 0,
          file_id: 0,
          is_external_donation: values?.is_external_donation?.id,
          owner: values?.owner || '',
          donation_description: '',
          donation_files: [],
          serial_number: '',
          inventory_number: '',
        },
      ];

      await mutate(
        data,
        () => {
          alert.success('Uspješno dodavanje osnovnih sredstava.');
          navigate('/inventory/immovable-inventory');
        },
        () => alert.error('Neuspješno dodavanje osnovnih sredstava.'),
      );
    }
  };

  return (
    <Form>
      <FieldsContainer style={{gap: '10px'}}>
        <FormRow>
          <Controller
            name="type_id"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value as any}
                onChange={onChange}
                label="VRSTA NEPOKRETNOSTI:"
                options={realEstateTypeOptions}
                isRequired
                error={errors?.type_id?.message}
              />
            )}
          />

          <Input
            {...register('location', {required: 'Ovo polje je obavezno'})}
            label="LOKACIJA:"
            isRequired
            error={errors.location?.message}
          />

          <Input
            {...register('square_area', {required: 'Ovo polje je obavezno'})}
            label="POVRŠINA M2:"
            type="number"
            isRequired
            error={errors.square_area?.message}
          />

          <Input
            {...register('land_serial_number', {required: 'Ovo polje je obavezno'})}
            label="BROJ KATASTARSKE PARCELE:"
            isRequired
            error={errors.land_serial_number?.message}
          />
          <Controller
            name="property_document"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                label="ISPRAVE O SVOJINI:"
                options={propertyDocumentOptions}
                isRequired
                error={errors.property_document?.message}
              />
            )}
          />
        </FormRow>

        <FormRow>
          <Input
            {...register('ownership_scope')}
            label="OBIM PRAVA:"
            error={errors.ownership_scope?.message}
            isRequired
            disabled={propertyDocument?.id !== 'Svojina'}
          />
          <Input
            {...register('gross_price', {required: 'Ovo polje je obavezno'})}
            label="NABAVNA VRIJEDNOST:"
            isRequired
            error={errors.gross_price?.message}
            type="number"
            rightContent={<div>€</div>}
          />
        </FormRow>

        <FormRow>
          <Input
            {...register('document', {required: 'Ovo polje je obavezno'})}
            label="LIST NEPOKRETNOSTI:"
            isRequired
            error={errors.document?.message}
          />
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
                label="TERETI I OGRANIČENJA:"
                isRequired
                error={errors.limitation?.message}
              />
            )}
          />

          <Input
            {...register('limitations_description')}
            label="OPIS TERETA OGRANIČENJA:"
            disabled={!limitation?.id}
            isRequired
            error={errors.limitations_description?.message}
          />
          <Controller
            name="depreciation_type"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={amortizationGroupOptions}
                label="AMORTIZACIONA GRUPA:"
                isRequired
                error={errors.depreciation_type?.message}
              />
            )}
          />
        </FormRow>
        <FormRow>
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
                isRequired
                error={errors.is_external_donation?.message}
              />
            )}
          />
          <Input
            {...register('owner')}
            label="VLASNIK:"
            disabled={!is_external_donation?.id}
            isRequired
            error={errors.owner?.message}
          />
        </FormRow>
      </FieldsContainer>

      <ButtonContainer>
        <Button content="Odustani" onClick={() => reset()} />
        <Button content="Sačuvaj" onClick={handleSubmit(addButtonClick)} variant="primary" isLoading={loading} />
      </ButtonContainer>
    </Form>
  );
};

export default ImmovableAddForm;
