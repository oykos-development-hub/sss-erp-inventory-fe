import {Button, Dropdown, Input, TableHead, Theme, TrashIcon, Typography} from 'client-library';
import {useEffect, useState} from 'react';
import {Controller, FormProvider, useFieldArray, useForm} from 'react-hook-form';
import ImmovableAddForm from '../../components/immovableAddForm/immovableAddForm';
import MovableAddForm from '../../components/movableAddForm/movableAddForm';
import SmallInventoryForm from '../../components/smallInventoryForm/smallInventoryForm';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {InventoryProps} from '../../types/inventoryProps';
import {parseDateForBackend} from '../../utils/dateUtils';
import {newTableItem, tableHeads} from './constants';
import {ButtonContainer, StyledTable} from './styles';
import {DropdownName, InputName, TableItemValues, TableValues, valuesType} from './types';
import {MovableAddFormProps} from '../../components/movableAddForm/types';
import {SmallInventoryAddFormProps} from '../../components/smallInventoryForm/types';

const InventoryAdd = ({context, type}: InventoryProps) => {
  const [isOrderListSelected, setIsOrderListSelected] = useState(false);
  const isImmovable = type === 'immovable';
  const orgUnitId = context.contextMain.organization_unit.id;

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
  const {options: amortizationGroupOptions} = useGetSettings({entity: 'deprecation_types'});
  const [movableValues, setMovableValues] = useState<MovableAddFormProps>();
  const [smallInventoryValues, setSmallInventoryValues] = useState<SmallInventoryAddFormProps>();

  const {options: classOptions} = useGetSettings({entity: 'inventory_class_type'});
  const {mutate, loading} = useInventoryInsert();

  const updatedTableHeads = tableHeads
    .filter(item => {
      if (type === 'small' && item.accessor === 'depreciation_type') return false;
      return true;
    })
    .map((head: TableHead) => {
      const isDisabled = (head.accessor === 'title' || head.accessor === 'gross_price') && isOrderListSelected;
      const options = head.accessor === 'class_type' ? classOptions : amortizationGroupOptions;

      if (head.type === 'custom') {
        if (head.accessor === 'class_type' || head.accessor === 'depreciation_type') {
          return {
            ...head,
            renderContents: (item: any, __: any, index: any) => {
              return (
                <Controller
                  key={item.id}
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
            renderContents: (item: any, __: any, index: any) => {
              return (
                <Input
                  key={item.id}
                  type={head.accessor === 'gross_price' ? 'number' : 'text'}
                  {...register(`items.${index}.${head.accessor}` as InputName, {
                    required: head.accessor === 'serial_number' ? 'Ovo polje je obavezno' : false,
                  })}
                  disabled={isDisabled}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  error={errors?.items?.[index]?.[`${head.accessor}`]?.message}
                  rightContent={head.accessor === 'gross_price' ? <div>€</div> : undefined}
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
        date_of_purchase: movableValues
          ? parseDateForBackend(movableValues?.date_of_purchase)
          : parseDateForBackend(smallInventoryValues?.date_of_purchase),
        source: movableValues ? movableValues?.source?.id : smallInventoryValues?.source?.id,
        office_id: movableValues ? movableValues?.office?.id : smallInventoryValues?.office?.id,
        invoice_number: movableValues ? movableValues?.invoice_number : smallInventoryValues?.invoice_number,
        supplier_id: movableValues ? movableValues?.supplier?.id : smallInventoryValues?.supplier?.id,

        // item data
        depreciation_type_id: item?.depreciation_type?.id,
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
        date_of_assessment: null,
        lifetime_of_assessment_in_months: 0,
        active: false,
        deactivation_description: '',
        invoice_file_id: 0,
        file_id: 0,
        contract_id: movableValues?.contract?.id,
        contract_article_id: item?.contract_article_id,
      }));

      await mutate(
        data,
        () => {
          alert.success('Uspješno dodavanje osnovnih sredstava');
          navigate(`/inventory/${type}-inventory`);
        },
        erroMessage => alert.error(erroMessage),
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
      if (values && 'articles' in values) {
        if (values.articles?.amount == 1) {
          setIsOrderListSelected(true);
          setMovableValues({...values});

          append({
            id: Math.floor(Math.random() * 1000),
            inventory_number: '',
            title: values?.articles?.title,
            serial_number: '',
            gross_price: values.articles?.gross_value?.toString(),
            description: '',
            contract_article_id: values?.articles?.id,
          });
        } else if (values?.articles?.amount && values?.articles?.amount > 1) {
          for (let i = 0; i < values?.articles?.amount; i++) {
            append({
              id: Math.floor(Math.random() * 1000),
              inventory_number: '',
              title: values?.articles?.title,
              serial_number: '',
              gross_price: values.articles?.gross_value?.toString(),
              description: '',
              contract_article_id: values?.articles?.id,
            });
          }
        }
      } else if (values && 'items' in values) {
        setSmallInventoryValues({...values});
        append({
          id: Math.floor(Math.random() * 1000),
          inventory_number: '',
          title: '',
          serial_number: '',
          gross_price: '',
          description: '',
        });
      }
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
    movable: <MovableAddForm context={context} onFormSubmit={handleFormSubmit} selectedArticles={fields} />,
    immovable: <ImmovableAddForm context={context} />,
    small: <SmallInventoryForm context={context} onFormSubmit={handleFormSubmit} />,
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
            <Button
              content="Sačuvaj"
              onClick={handleSubmit(onSubmit)}
              variant="primary"
              loader={loading}
              disabled={orgUnitId !== 3}
            />
          </ButtonContainer>
        </>
      )}
    </FormProvider>
  );
};
export default InventoryAdd;
