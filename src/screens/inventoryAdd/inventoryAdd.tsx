import {Button, Dropdown, Input, TableHead, Theme, TrashIcon, Typography} from 'client-library';
import {useEffect, useState} from 'react';
import {Controller, FormProvider, useFieldArray, useForm} from 'react-hook-form';
import ImmovableAddForm from '../../components/immovableAddForm/immovableAddForm';
import MovableAddForm from '../../components/movableAddForm/movableAddForm';
import SmallInventoryForm from '../../components/smallInventoryForm/smallInventoryForm';
import useClassTypesGet from '../../services/graphQL/classTypes/useClassTypesGet';
import useDepreciationTypesGet from '../../services/graphQL/depreciationTypes/useDepreciationTypesGet';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {InventoryProps} from '../../types/inventoryProps';
import {parseDate} from '../../utils/dateUtils';
import {newTableItem, tableHeads} from './constants';
import {mockTableData} from './mockData';
import {ButtonContainer, StyledTable} from './styles';
import {DropdownName, InputName, TableItemValues, TableValues, valuesType} from './types';

const InventoryAdd = ({context, type}: InventoryProps) => {
  const [isOrderListSelected, setIsOrderListSelected] = useState(false);
  const isImmovable = type === 'immovable';

  const {
    alert,
    navigation: {navigate},
  } = context;

  const methods = useForm<TableValues>();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors, isValid},
    watch,
  } = methods;

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'items',
  });

  const {options: amortizationGroupOptions} = useDepreciationTypesGet({page: 1, size: 10});
  const {options: classOptions} = useClassTypesGet({search: '', id: 0});
  const {mutate} = useInventoryInsert();

  const updatedTableHeads = tableHeads.map((head: TableHead) => {
    const isDisabled = (head.accessor === 'title' || head.accessor === 'gross_price') && isOrderListSelected;
    const options = head.accessor === 'class_type' ? classOptions : amortizationGroupOptions;

    if (head.type === 'custom') {
      if (head.accessor === 'class_type' || head.accessor === 'depreciation_type') {
        return {
          ...head,
          renderContents: (_: any, __: any, index: any) => {
            return (
              <Controller
                name={`items.${index}.${head.accessor}` as DropdownName}
                rules={{required: 'Ovo polje je obavezno'}}
                control={control}
                render={({field: {name, value, onChange}}) => (
                  <Dropdown
                    name={name}
                    value={value}
                    onChange={onChange}
                    options={options}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    error={errors?.items?.[index]?.[`${head.accessor}`]?.message}
                  />
                )}
              />
            );
          },
        } as TableHead;
      } else {
        return {
          ...head,
          renderContents: (_: any, __: any, index: any) => {
            return (
              <Input
                type={head.accessor === 'gross_price' ? 'number' : 'text'}
                {...register(`items.${index}.${head.accessor}` as InputName, {
                  required: head.accessor !== 'description' ? 'Ovo polje je obavezno' : false,
                })}
                disabled={isDisabled}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                error={errors?.items?.[index]?.[`${head.accessor}`]?.message}
              />
            );
          },
        } as TableHead;
      }
    } else return head;
  });

  // handlers:

  const onSubmit = async (values: any) => {
    if (isValid) {
      const data = values.items.map((item: any) => ({
        // form data
        id: 0,
        date_of_purchase: parseDate(values.date_of_purchase, true) || '',
        source: values.source.id,
        office_id: values.office.id,
        invoice_number: Number(values.invoice_number),
        supplier_id: values.supplier.id,

        // item data
        depreciation_type_id: item.depreciation_type.id,
        class_type_id: item.class_type.id,
        inventory_number: item.inventory_number,
        title: item.title,
        description: item.description,
        gross_price: Number(item.gross_price),
        serial_number: item.serial_number,

        // other
        type: type,
        real_estate: null,
        abbreviation: '',
        internal_ownership: true,
        location: '', //?
        target_user_profile_id: 1,
        unit: '',
        amount: 1, // default 1
        net_price: 1,
        donor_title: '',
        price_of_assessment: 0,
        date_of_assessment: '',
        lifetime_of_assessment_in_months: 0,
        active: false,
        deactivation_description: '',
        invoice_file_id: undefined,
        file_id: '',
      }));

      await mutate(
        data,
        () => {
          alert.success('Uspjšeno dodavanje osnovnih sredstava');
          navigate(`/inventory/${type}-inventory`);
        },
        () => alert.error('Neuspjšeno dodavanje osnovnih sredstava'),
      );
    }
  };

  const clearButtonClick = () => {
    reset(); // reset form
    remove(); // clear table
    setIsOrderListSelected(false);
  };

  const handleFormSubmit = (values: valuesType) => {
    if (!isImmovable) {
      if (values && 'order_list' in values && values.order_list) {
        remove(); // clear table
        setIsOrderListSelected(true);
        append(mockTableData); // should append data from selected order_list
      } else append(newTableItem);
    }
  };

  const calculateTotal = () => {
    const items = watch('items');
    let sum = 0;
    if (items) {
      items.forEach((item: TableItemValues) => {
        const price = parseFloat(item?.gross_price?.toString() || '0');
        sum += price;
      });
    }
    return sum;
  };

  const renderFormByType = {
    movable: <MovableAddForm onFormSubmit={handleFormSubmit} />,
    immovable: <ImmovableAddForm context={context} />,
    small: <SmallInventoryForm onFormSubmit={handleFormSubmit} />,
  };

  useEffect(() => {
    calculateTotal();
  }, [watch('items')]);

  return (
    <FormProvider {...methods}>
      {renderFormByType[type]}

      {!isImmovable && (
        <>
          <StyledTable
            data={fields as TableItemValues[]}
            tableHeads={updatedTableHeads}
            tableActions={
              isOrderListSelected
                ? []
                : [
                    {
                      name: 'delete',
                      onClick: (item: TableItemValues) => remove(fields.findIndex(field => field.id === item.id)),
                      icon: <TrashIcon stroke={Theme?.palette?.gray800} />,
                    },
                  ]
            }
            style={{marginBottom: '20px'}}
          />

          <Input
            label="TOTAL:"
            style={{width: '300px'}}
            value={calculateTotal().toString()}
            leftContent={<Typography content="€" />}
            disabled
          />

          <ButtonContainer>
            <Button content="Odustani" onClick={clearButtonClick} />
            <Button content="Dodaj u inventar" onClick={handleSubmit(onSubmit)} variant="primary" />
          </ButtonContainer>
        </>
      )}
    </FormProvider>
  );
};
export default InventoryAdd;
