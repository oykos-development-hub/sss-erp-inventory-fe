import {Datepicker, Dropdown, Input} from 'client-library';
import {Controller, useFormContext} from 'react-hook-form';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import {supplierOptions} from '../../screens/inventoryAdd/mockData';
import {AddInventoryFormProps} from '../../screens/inventoryAdd/types';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import {FieldsContainer, Form, FormRow} from '../../shared/formStyles';
import PlusButton from '../../shared/plusButton';
import {parseDate} from '../../utils/dateUtils';
import {SmallInventoryAddFormProps} from './types';

const SmallInventoryForm = ({onFormSubmit, context}: AddInventoryFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useFormContext<SmallInventoryAddFormProps>();

  const {options: locationOptions} = useOrgUnitOfficesGet({page: 1, size: 10, id: 0, context});

  const onSubmit = (values: SmallInventoryAddFormProps) => {
    onFormSubmit(values);
  };

  return (
    <Form>
      <FieldsContainer>
        <FormRow>
          <Input {...register('invoice_number')} label="BROJ RAČUNA NABAVKE:" type="number" />

          <Controller
            name="date_of_purchase"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                name={name}
                value={value ? parseDate(value) : ''}
                onChange={onChange}
                label="DATUM NABAVKE:"
                error={errors.date_of_purchase?.message}
              />
            )}
          />
        </FormRow>

        <FormRow>
          <Controller
            name="source"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={inventorySourceOptions}
                label="IZVOR SREDSTAVA:"
                error={errors.source?.message}
              />
            )}
          />

          <Controller
            name="supplier"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={supplierOptions}
                placeholder=""
                label="DOBAVLJAČ:"
                error={errors.supplier?.message}
              />
            )}
          />
        </FormRow>

        <FormRow>
          <Controller
            name="office"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={locationOptions}
                label="Lokacija:"
                error={errors.office?.message}
              />
            )}
          />
        </FormRow>
      </FieldsContainer>

      <PlusButton onClick={handleSubmit(onSubmit)} />
    </Form>
  );
};

export default SmallInventoryForm;
