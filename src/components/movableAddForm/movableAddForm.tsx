import {Controller, useFormContext} from 'react-hook-form';
import {Form, FieldsContainer, FormRow} from '../../shared/formStyles';
import {parseDate} from '../../utils/dateUtils';
import PlusButton from '../../shared/plusButton';
import {Dropdown, Input, Datepicker} from 'client-library';
import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {AddInventoryFormProps} from '../../screens/inventoryAdd/types';
import {MovableAddFormProps} from './types';
import {mockMovableFormData} from '../../screens/inventoryAdd/mockData';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import {Tooltip} from 'client-library';
import {TooltipWrapper} from './styles';
import useGetOrderList from '../../services/graphQL/getOrderList/useGetOrderList';
import {useDebounce} from '../../utils/useDebounce';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';

const MovableAddForm = ({onFormSubmit, context}: AddInventoryFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: {isValid, errors},
  } = useFormContext<MovableAddFormProps>();
  const selectedOrderList = watch('order_list');
  const onSubmit = (values: MovableAddFormProps) => {
    isValid && onFormSubmit(values);
  };
  const orgUnitId = context.contextMain.organization_unit.id;
  const {options: locationOptions} = useOrgUnitOfficesGet({
    page: 1,
    size: 1000,
    organization_unit_id: Number(orgUnitId),
  });
  const {orders, orderListOptions} = useGetOrderList({page: 1, size: 1000});

  const {suppliers} = useSuppliersOverview();

  const handleOrderListChange = (selectedOrderList: DropdownDataNumber) => {
    // When order list is selected:
    // reset the form
    reset();
    // set source to 'budzet'
    setValue('order_list', selectedOrderList);
    setValue('source', {id: 'budzet', title: 'Budžet'});
    // fill some of the fields
    const order = orders.find(item => item.id === selectedOrderList.id);
    const updatedData = {...mockMovableFormData, order_list: selectedOrderList, articles: order?.articles || []};
    Object.keys(updatedData).forEach(key => {
      setValue(key as keyof typeof updatedData, updatedData[key as keyof typeof updatedData]);
    });
    onFormSubmit(updatedData);
  };
  return (
    <Form>
      <FieldsContainer>
        <FormRow>
          <Controller
            name="order_list"
            control={control}
            render={({field: {name, value}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={selectedValue => handleOrderListChange(selectedValue as DropdownDataNumber)}
                options={orderListOptions}
                label="NARUDŽBENICA:"
              />
            )}
          />
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
                label="LOKACIJA:"
                error={errors.office?.message}
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
                placeholder=""
                label="IZVOR SREDSTAVA:"
                isDisabled={!!selectedOrderList}
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
                isDisabled={!!selectedOrderList}
                error={errors.supplier?.message}
              />
            )}
          />
        </FormRow>
        <FormRow>
          <Input
            {...register('invoice_number', {required: 'Ovo polje je obavezno'})}
            label="BROJ RAČUNA NABAVKE:"
            error={errors.invoice_number?.message}
          />
          <Controller
            name="date_of_purchase"
            control={control}
            rules={{required: 'Ovo polje je obavezno'}}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                name={name}
                value={value ? parseDate(value) : ''}
                onChange={onChange}
                placeholder=""
                label="DATUM NABAVKE:"
                isDisabled={selectedOrderList}
                error={errors.date_of_purchase?.message}
              />
            )}
          />
        </FormRow>
      </FieldsContainer>
      {selectedOrderList ? (
        <TooltipWrapper>
          <Tooltip
            style={{width: '200px'}}
            variant="filled"
            position="topLeft"
            content={'Funkcionalnost je onemogućena zbog odabira narudžbenice.'}>
            <PlusButton onClick={handleSubmit(onSubmit)} disabled={!!selectedOrderList} />
          </Tooltip>
        </TooltipWrapper>
      ) : (
        <PlusButton onClick={handleSubmit(onSubmit)} disabled={!!selectedOrderList} />
      )}
    </Form>
  );
};
export default MovableAddForm;
