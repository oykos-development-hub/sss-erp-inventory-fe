import {Button, Dropdown, Input} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {realEstateTypeOptions, restrictionOptions, rightPropertyOptions} from '../../screens/inventoryAdd/constants';
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
    formState: {errors, isValid},
  } = useForm<ImmovableAddFormProps>({defaultValues: initialValues});

  const {
    alert,
    navigation: {navigate},
  } = context;

  const {options: amortizationGroupOptions} = useGetSettings({entity: 'deprecation_types'});
  const {mutate} = useInventoryInsert();

  const myOrgUnitId = context.contextMain?.organization_unit.id ?? 0;
  //handlers

  const addButtonClick = async (values: ImmovableAddFormProps) => {
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
          real_estate: {
            id: 0,
            square_area: values?.square_area || 0,
            land_serial_number: values?.land_serial_number || '',
            estate_serial_number: ' ',
            ownership_type: ' ',
            ownership_scope: values?.ownership_scope?.id || '',
            ownership_investment_scope: values?.ownership_investment_scope || '',
            limitations_description: values?.limitations_description || '',
            file_id: 0,
            type_id: values?.type?.id || '',
            property_document: values?.property_document || '',
            limitation_id: values?.limitation?.id || '',
            document: values?.document || '',
            title: ' ',
          },
          depreciation_type_id: values?.depreciation_type?.id || 0,
          file_id: 0,
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
            name="type"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                label="VRSTA NEPOKRETNOSTI:"
                options={realEstateTypeOptions}
                error={errors.type?.message}
              />
            )}
          />

          <Input
            {...register('location', {required: 'Ovo polje je obavezno'})}
            label="LOCATION:"
            error={errors.location?.message}
          />

          <Input
            {...register('square_area', {required: 'Ovo polje je obavezno'})}
            label="POVRŠINA M2:"
            type="number"
            error={errors.square_area?.message}
          />

          <Input
            {...register('land_serial_number', {required: 'Ovo polje je obavezno'})}
            label="BROJ KATASTARSKE PARCELE:"
            error={errors.land_serial_number?.message}
          />

          <Input
            {...register('property_document', {required: 'Ovo polje je obavezno'})}
            label="ISPRAVE O SVOJINI:"
            error={errors.property_document?.message}
          />
        </FormRow>

        <FormRow>
          <div style={{width: 'fit-content'}}>
            <Controller
              name="ownership_scope"
              rules={{required: 'Ovo polje je obavezno'}}
              control={control}
              render={({field: {name, value, onChange}}) => (
                <Dropdown
                  name={name}
                  value={value}
                  onChange={onChange}
                  options={rightPropertyOptions}
                  label="OBIM PRAVA:"
                  error={errors.ownership_scope?.message}
                />
              )}
            />
          </div>

          <Input
            {...register('ownership_investment_scope', {required: 'Ovo polje je obavezno'})}
            label="OBIM PRAVA ZA IMOVINU STEČENU ZAJEDNIČKIM ULAGANJEM:"
            error={errors.ownership_investment_scope?.message}
          />
        </FormRow>

        <FormRow>
          <Input
            {...register('gross_price', {required: 'Ovo polje je obavezno'})}
            label="NABAVNA VRIJEDNOST:"
            error={errors.gross_price?.message}
            type="number"
          />

          <Input
            {...register('document', {required: 'Ovo polje je obavezno'})}
            label="LIST NEPOKRETNOSTI:"
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
                label="TERETI OGRANIČENJA:"
                error={errors.limitation?.message}
              />
            )}
          />

          <Input
            {...register('limitations_description', {required: 'Ovo polje je obavezno'})}
            label="OPIS TERETA OGRANIČENJA:"
            error={errors.limitations_description?.message}
          />
        </FormRow>

        <FormRow>
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
                error={errors.depreciation_type?.message}
              />
            )}
          />
        </FormRow>
      </FieldsContainer>

      <ButtonContainer>
        <Button content="Odustani" onClick={() => reset()} />
        <Button content="Dodaj u inventar" onClick={handleSubmit(addButtonClick)} variant="primary" />
      </ButtonContainer>
    </Form>
  );
};

export default ImmovableAddForm;
