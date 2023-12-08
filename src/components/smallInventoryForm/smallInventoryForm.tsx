import {Datepicker, Dropdown, Input} from 'client-library';
import {Controller, useFormContext} from 'react-hook-form';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import {AddInventoryFormProps} from '../../screens/inventoryAdd/types';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import {FieldsContainer, Form, FormRow} from '../../shared/formStyles';
import PlusButton from '../../shared/plusButton';
import {parseDate} from '../../utils/dateUtils';
import {SmallInventoryAddFormProps} from './types';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';

const SmallInventoryForm = ({onFormSubmit, context}: AddInventoryFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useFormContext<SmallInventoryAddFormProps>();

  const orgUnitId = context.contextMain.organization_unit.id;
  const {options: locationOptions} = useOrgUnitOfficesGet({
    page: 1,
    size: 1000,
    organization_unit_id: Number(orgUnitId),
  });
  const {suppliers} = useSuppliersOverview();

  const onSubmit = (values: SmallInventoryAddFormProps) => {
    onFormSubmit(values);
  };

  return (
    <Form>
      <FieldsContainer>
        <FormRow>
          <Input {...register('invoice_number')} label="BROJ RAČUNA NABAVKE:" />

          <Controller
            name="date_of_purchase"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                name={name}
                selected={value ? new Date(value) : ''}
                onChange={onChange}
                label="DATUM NABAVKE:"
                isRequired
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
                isRequired
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
                options={suppliers}
                placeholder=""
                label="DOBAVLJAČ:"
                isRequired
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
                isRequired
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
