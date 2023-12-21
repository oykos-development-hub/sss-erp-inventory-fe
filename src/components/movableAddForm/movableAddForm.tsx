import {Button, Datepicker, Dropdown, Input, Tooltip} from 'client-library';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import useAppContext from '../../context/useAppContext';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import {AddInventoryFormProps} from '../../screens/inventoryAdd/types';
import {REQUEST_STATUSES} from '../../services/constants';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import useProcurementContractArticles from '../../services/graphQL/publicProcurementContractArticles/usePublicProcurementContractArticles';
import usePublicProcurementContracts from '../../services/graphQL/publicProcurementContracts/usePublicProcurementContracts';
import {uploadDonateInventoryXls} from '../../services/uploadDonateInventoryXls';
import {FieldsContainer, Form, FormRow} from '../../shared/formStyles';
import PlusButton from '../../shared/plusButton';
import {DropdownDataNumber} from '../../types/dropdownData';
import {InventoryDonationItem} from '../../types/files';
import {PublicProcurementContracts} from '../../types/graphQL/publicProcurmentContract';
import {PublicProcurementContractArticles} from '../../types/graphQL/publicProcurmentContractArticles';
import {ButtonWrapper, LeftWrapper, Links, TooltipWrapper, TypeWrapper} from './styles';
import {MovableAddFormProps} from './types';
import MovableAddFormIvoice from './movableAddFormInvoice';
import {Type} from './constants';

const MovableAddForm = ({onFormSubmit, context, selectedArticles}: AddInventoryFormProps) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm<MovableAddFormProps>();
  const [article, setArticle] = useState<DropdownDataNumber>({id: 0, title: ''});
  const supplier = watch('supplier');
  const contract = watch('contract');
  const invoice_number = watch('invoice_number');

  const onSubmit = async (values: MovableAddFormProps) => {
    if (values.all_items) {
      for (const article of articles.items) {
        values.articles = {
          id: article.public_procurement_article.id,
          title: article.public_procurement_article.title,
          gross_value: article.gross_value,
          amount: article.amount,
        };
        useArticle(article.id, article.amount);
        setArticle({id: 0, title: ''});
        await onFormSubmit(values);
      }
    } else {
      const articleFind = articles.items.find((item: PublicProcurementContractArticles) => item.id === article?.id);

      if (articleFind) {
        values.articles = {
          id: articleFind.public_procurement_article.id,
          title: articleFind.public_procurement_article.title,
          gross_value: articleFind.gross_value,
          amount: 1,
        };
        useArticle(articleFind.id, 1);
        setArticle({id: 0, title: ''});
      }

      await onFormSubmit(values);
    }
  };
  const orgUnitId = context.contextMain.organization_unit.id;
  const {options: locationOptions} = useOrgUnitOfficesGet({
    page: 1,
    size: 1000,
    organization_unit_id: Number(orgUnitId),
  });

  const {
    spreadsheetService: {openImportModal, closeImportModal},
    alert,
    contextMain: {token},
  } = useAppContext();

  const {
    data: contracts,
    options: contractOptions,
    fetch: fetchContracts,
    cleanData: cleanDataContracts,
  } = usePublicProcurementContracts();
  const {
    data: articles,
    options: articlesOptions,
    fetch: fetchArticles,
    useArticle,
    cleanData: cleanDataArticles,
  } = useProcurementContractArticles();

  useEffect(() => {
    if (supplier?.id) fetchContracts(supplier?.id);
    cleanDataArticles();
    cleanDataContracts();
  }, [supplier]);

  useEffect(() => {
    if (locationOptions?.length > 0) {
      const lager = locationOptions.find((item: DropdownDataNumber) => item.title === 'Lager');
      if (lager) setValue('office', lager);
    }
  }, [locationOptions]);

  useEffect(() => {
    if (contract?.id) fetchArticles(contract?.id, selectedArticles);
    const fullContract = contracts?.items?.find((item: PublicProcurementContracts) => item.id === contract?.id);
    if (fullContract) {
      setValue('date_of_contract_signing', new Date(fullContract.date_of_signing));
      setValue('date_of_conclusion', new Date(fullContract.date_of_expiry));
      setValue('invoice_number', fullContract.serial_number);
      setValue('source', {id: 'budzet', title: 'Budžet'});
    }
  }, [contract]);

  const {suppliers} = useSuppliersOverview();

  const onSubmitUploadedTable = async (articlesArr: InventoryDonationItem[]) => {
    for (const article of articlesArr) {
      const values: MovableAddFormProps = {
        invoice_number: invoice_number,
        source: contract?.id ? {id: 'budzet', title: 'Budžet'} : {id: 'donacija', title: 'Donacija'},
      };

      values.articles = {
        id: 0,
        title: article.title,
        gross_value: article.gross_price,
        serial_number: article.serial_number,
        description: article.description,
        amount: 1,
      };

      await onFormSubmit(values);
    }

    alert.success('Artiki iz exela su dodati');
    closeImportModal();
  };

  const contractId = contract?.id.toString() || '';

  const handleUploadTable = async (files: FileList) => {
    const response = await uploadDonateInventoryXls(files[0], type === 1, token, contractId);

    if (response?.status === REQUEST_STATUSES.success) {
      if (response?.data?.length) {
        return response.data;
      }
      return null;
    } else {
      alert.error('Došlo je do greške prilikom učitavanja fajla!');
    }
  };

  const type = watch('type')?.id;

  const openDonationUpload = () => {
    const props = {
      type: 'IMPORT_INVENTORIES',
      content: 'Tabela',
      data: {items: contract?.id ? articles.items : [], isDonating: type === 1},
      onSubmit: onSubmitUploadedTable,
      handleUpload: handleUploadTable,
    };
    openImportModal(props);
  };

  return (
    <>
      {orgUnitId === 3 ? (
        <Form>
          <TypeWrapper>
            <Controller
              name="type"
              control={control}
              render={({field: {name, value, onChange}}) => (
                <Dropdown name={name} value={value} options={Type} onChange={onChange} label="TIP:" />
              )}
            />
          </TypeWrapper>
          {type === undefined || type === 0 ? (
            <>
              <FieldsContainer>
                <FormRow>
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
                  <Controller
                    name="contract"
                    rules={{required: 'Ovo polje je obavezno'}}
                    control={control}
                    render={({field: {name, value, onChange}}) => (
                      <Dropdown
                        name={name}
                        value={value}
                        options={contractOptions as any}
                        onChange={onChange}
                        label="UGOVORI:"
                        isRequired
                        error={errors.supplier?.message}
                      />
                    )}
                  />

                  <Controller
                    name="date_of_contract_signing"
                    control={control}
                    rules={{required: 'Ovo polje je obavezno'}}
                    disabled={!!contract?.id}
                    render={({field: {name, value, onChange}}) => (
                      <Datepicker
                        name={name}
                        selected={value ? new Date(value) : ''}
                        onChange={onChange}
                        placeholder=""
                        label="DATUM POTPISIVANJA UGOVORA:"
                        isRequired
                        error={errors.date_of_contract_signing?.message}
                        disabled={!!contract?.id}
                      />
                    )}
                  />
                </FormRow>
                <FormRow>
                  <Controller
                    name="date_of_conclusion"
                    control={control}
                    rules={{required: 'Ovo polje je obavezno'}}
                    disabled={!!contract?.id}
                    render={({field: {name, value, onChange}}) => (
                      <Datepicker
                        name={name}
                        selected={value ? new Date(value) : ''}
                        onChange={onChange}
                        placeholder=""
                        label="DATUM ZAVRŠETKA UGOVORA:"
                        isRequired
                        error={errors.date_of_conclusion?.message}
                        disabled={!!contract?.id}
                      />
                    )}
                  />
                  <Controller
                    name="date_of_purchase"
                    control={control}
                    rules={{required: 'Ovo polje je obavezno'}}
                    render={({field: {name, value, onChange}}) => (
                      <Datepicker
                        name={name}
                        selected={value ? new Date(value) : ''}
                        onChange={onChange}
                        placeholder=""
                        label="DATUM NABAVKE"
                        isRequired
                        error={errors.date_of_purchase?.message}
                      />
                    )}
                  />
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
                        isRequired
                        error={errors.source?.message}
                        isDisabled={!!contract?.id}
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
                        isRequired
                        error={errors.office?.message}
                      />
                    )}
                  />
                </FormRow>
              </FieldsContainer>
              <TooltipWrapper>
                <ButtonWrapper>
                  <Button
                    content={contract?.id ? 'Generiši Excel' : 'Donacija'}
                    onClick={openDonationUpload}
                    variant="primary"
                  />
                </ButtonWrapper>
                <LeftWrapper>
                  <Dropdown
                    onChange={item => {
                      setArticle({id: Number(item.id), title: item.title?.toString() || ''});
                    }}
                    options={articlesOptions || []}
                    placeholder="Izaberi artikal"
                    label="Artikli"
                    value={article}
                    error={errors.source?.message}
                    isDisabled={!articlesOptions || articlesOptions.length == 0}
                    className="width200"
                  />
                  {contract && contract.id !== 0 ? (
                    <PlusButton disabled={!article.id} onClick={handleSubmit(onSubmit)} />
                  ) : (
                    <Tooltip
                      style={{width: '200px'}}
                      variant="filled"
                      position="topLeft"
                      content={'Funkcionalnost je onemogućena zbog odabira ugovora.'}>
                      <PlusButton
                        onClick={handleSubmit(values => {
                          values.all_items = false;
                          onSubmit(values);
                        })}
                        disabled={!!contract && contract?.id !== 0}
                      />
                    </Tooltip>
                  )}
                </LeftWrapper>
              </TooltipWrapper>
              <LeftWrapper>
                <Links
                  onClick={handleSubmit(values => {
                    values.all_items = true;
                    onSubmit(values);
                  })}>
                  Učitaj sve
                </Links>
              </LeftWrapper>
            </>
          ) : (
            <MovableAddFormIvoice />
          )}
        </Form>
      ) : (
        <MovableAddFormIvoice />
      )}
    </>
  );
};
export default MovableAddForm;
