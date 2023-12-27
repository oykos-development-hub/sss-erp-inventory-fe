import {Button, Dropdown, Input, TableHead, Theme, TrashIcon, Typography} from 'client-library';
import {useEffect, useState} from 'react';
import {Controller, FormProvider, useFieldArray, useForm} from 'react-hook-form';
import ImmovableAddForm from '../../components/immovableAddForm/immovableAddForm';
import MovableAddForm from '../../components/movableAddForm/movableAddForm';
import {MovableAddFormProps} from '../../components/movableAddForm/types';
import SmallInventoryForm from '../../components/smallInventoryForm/smallInventoryForm';
import {SmallInventoryAddFormProps} from '../../components/smallInventoryForm/types';
import useAppContext from '../../context/useAppContext';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import useInventoryInsert from '../../services/graphQL/inventoryInsert/useInventoryInsert';
import {InventoryInsertResponse} from '../../types/graphQL/inventoryInsert';
import {InventoryProps} from '../../types/inventoryProps';
import {parseDateForBackend} from '../../utils/dateUtils';
import {tableHeads} from './constants';
import {ButtonContainer, StyledTable} from './styles';
import {DropdownName, InputName, TableItemValues, TableValues, valuesType} from './types';

const InventoryAdd = ({context, type}: InventoryProps) => {
  const [isOrderListSelected, setIsOrderListSelected] = useState(false);
  const [donationFiles, setDonationFiles] = useState<FileList | null>(null);
  const isImmovable = type === 'immovable';
  const orgUnitId = context.contextMain.organization_unit.id;

  const {
    fileService: {uploadFile},
    alert,
    navigation: {navigate},
  } = useAppContext();

  const methods = useForm<TableValues>();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors, isValid},
    setError,
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
                    pattern:
                      head.accessor === 'inventory_number'
                        ? {
                            value: /^[0-9]+$/,
                            message: 'Dozvoljen je samo unos brojeva.',
                          }
                        : undefined,
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
        donor_id: movableValues ? movableValues?.donor?.id : 0,
        donation_description: movableValues?.donation_description,
        donation_files: movableValues?.donation_files,
        is_external_donation: movableValues?.is_external_donation?.id === 'PS2' ? true : false,
        invoice_id: movableValues?.invoice_id,

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

      // In the case of donations we can have files which need to be uploaded first to get the ids
      if (donationFiles) {
        const formData = new FormData();
        const fileArray = Array.from(donationFiles);

        fileArray.forEach((file: any) => {
          formData.append('file', file);
        });

        await uploadFile(formData, async (res: any) => {
          setDonationFiles(null);
          const newFileIds = res.map((file: any) => file.id);
          const currentIds = movableValues && movableValues?.donation_files ? movableValues?.donation_files : [];
          const updatedDonationFiles = movableValues?.donation_files ? [...currentIds, ...newFileIds] : newFileIds;

          const updatedData = data.map((item: any) => ({
            ...item,
            donation_files: updatedDonationFiles,
          }));

          mutateInventoryItems(updatedData);
        });
      } else {
        mutateInventoryItems(data);
      }
    }
  };

  const mutateInventoryItems = async (data: any) => {
    await mutate(
      data,
      () => {
        alert.success('Uspješno dodavanje osnovnih sredstava');
        navigate(`/inventory/${type}-inventory`);
      },
      (response: InventoryInsertResponse) => {
        if (response.validator.length) {
          setDuplicateErrors(response.validator);
          return;
        }
        alert.error('Neuspješno dodavanje osnovnih sredstava');
      },
    );
  };

  const setDuplicateErrors = (validator: InventoryInsertResponse['validator']) => {
    let lowestIndex = 0;

    if (validator.length) {
      validator.forEach(item => {
        if (item.entity === 'inventory_number') {
          const index = fields.findIndex(field => field.inventory_number === item.value);
          if (index < lowestIndex) lowestIndex = index;
          if (index !== -1) {
            setError(`items.${index}.inventory_number`, {message: 'Inventarski broj već postoji'});
          }
        }
        if (item.entity === 'serial_number') {
          const index = fields.findIndex(field => field.serial_number === item.value);
          if (index < lowestIndex) lowestIndex = index;
          if (index !== -1) {
            setError(`items.${index}.serial_number`, {message: 'Serijski broj već postoji'});
          }
        }
      });
    }

    // Bad approach, but it works for now
    const allTableRows = Array.from(document.querySelectorAll('tr'));
    const row = allTableRows[lowestIndex];

    if (row) {
      row.scrollIntoView({behavior: 'smooth', block: 'center'});
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
            serial_number: values?.articles?.serial_number,
            gross_price: values.articles?.gross_value?.toString(),
            description: values?.articles?.description,
            contract_article_id: values?.articles?.id,
          });
        } else if (values?.articles?.amount && values?.articles?.amount > 1) {
          for (let i = 0; i < values?.articles?.amount; i++) {
            append({
              id: Math.floor(Math.random() * 1000),
              inventory_number: '',
              title: values?.articles?.title,
              serial_number: values?.articles?.serial_number,
              gross_price: values.articles?.gross_value?.toString(),
              description: values?.articles?.description,
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

  const handleDonationFilesUpload = (files: FileList) => {
    setDonationFiles(files);
    context.alert.success('Fajlovi uspješno učitani');
  };

  const onDeleteDonationFile = (id: number) => {
    //TODO: delete file from server
    console.log('onDeleteDonationFile', id);
  };

  const renderFormByType = {
    movable: (
      <MovableAddForm
        context={context}
        onFormSubmit={handleFormSubmit}
        selectedArticles={fields}
        donationFiles={donationFiles}
        handleUpload={handleDonationFilesUpload}
      />
    ),
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
