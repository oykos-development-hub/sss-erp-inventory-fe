import {Button, Datepicker, Dropdown, FileUpload, Input, Tooltip, Typography} from 'client-library';
import {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import useAppContext from '../../context/useAppContext';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import {AddInventoryFormProps} from '../../screens/inventoryAdd/types';
import {REQUEST_STATUSES} from '../../services/constants';
import useGetDonors from '../../services/graphQL/getSuppliers/useGetDonors';
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
import {Type} from './constants';
import MovableAddFormIvoice from './movableAddFormInvoice';
import {ButtonWrapper, LeftWrapper, Links, TooltipWrapper, TypeWrapper} from './styles';
import {MovableAddFormProps} from './types';

const MovableAddForm = ({
  onFormSubmit,
  context,
  selectedArticles,
  donationFiles,
  handleUpload,
}: AddInventoryFormProps & {
  donationFiles: FileList | null;
  handleUpload: (files: FileList) => void;
}) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: {errors},
    register,
  } = useFormContext<MovableAddFormProps>();
  const [article, setArticle] = useState<DropdownDataNumber>({id: 0, title: ''});

  const {
    invoice_number,
    date_of_purchase,
    office,
    supplier,
    contract,
    donation_description,
    donation_files,
    is_external_donation,
  } = watch();

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
  const {donors} = useGetDonors();

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
      // removed MovableAddFormProps type, because the form values type and payload type should be separated
      const values: any = {
        invoice_number: invoice_number,
        source: contract?.id ? {id: 'budzet', title: 'Budžet'} : {id: 'donacija', title: 'Donacija'},
        supplier: {id: supplier?.id || 0, title: supplier?.title || ''} || null,
        office: {id: office?.id || 0, title: office?.title || ''} || null,
        date_of_purchase: date_of_purchase,
        donation_description: donation_description,
        donation_files: donation_files,
        is_external_donation: is_external_donation?.id === 'PS2' ? true : false,
      };

      values.articles = {
        id: article.id,
        title: article.title,
        gross_value: article.gross_price,
        serial_number: article.serial_number,
        description: article.description,
        amount: 1,
      };

      await onFormSubmit(values);
    }

    alert.success('Artikli iz excela su dodati');
    closeImportModal();
  };

  const contractId = contract?.id.toString() || '';

  const handleUploadTable = async (files: FileList) => {
    const response = await uploadDonateInventoryXls(files[0], type === 2, token, contractId);

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

  const openDonationTableUpload = () => {
    const props = {
      type: 'IMPORT_INVENTORIES',
      content: 'Tabela',
      data: {items: contract?.id ? articles.items : [], isDonating: type === 2, contractId},
      onSubmit: onSubmitUploadedTable,
      handleUpload: handleUploadTable,
    };
    openImportModal(props);
  };

  const isDonation = !!type && type === 2;

  return (
    <>
      {orgUnitId === 3 ? (
        <Form>
          <TypeWrapper>
            <Controller
              name="type"
              rules={{required: 'Ovo polje je obavezno'}}
              control={control}
              render={({field: {name, value, onChange}}) => (
                <Dropdown name={name} value={value} options={Type} onChange={onChange} label="TIP:" />
              )}
            />
            {isDonation && (
              <Controller
                name="is_external_donation"
                rules={{required: 'Ovo polje je obavezno'}}
                control={control}
                render={({field: {name, value, onChange}}) => (
                  <Dropdown
                    name={name}
                    value={value}
                    options={[
                      {id: 'PS1', title: 'PS1'},
                      {id: 'PS2', title: 'PS2'},
                    ]}
                    onChange={onChange}
                    error={errors.is_external_donation?.message}
                    label="TIP SREDSTVA:"
                  />
                )}
              />
            )}
          </TypeWrapper>
          {type === undefined || type !== 1 ? (
            <>
              <FieldsContainer>
                <FormRow>
                  {isDonation && (
                    <Controller
                      name="donor"
                      rules={{required: 'Ovo polje je obavezno'}}
                      control={control}
                      render={({field: {name, value, onChange}}) => (
                        <Dropdown
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={donors}
                          placeholder=""
                          label="DONATOR:"
                          isRequired
                          error={errors.donor?.message}
                        />
                      )}
                    />
                  )}
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
                  {!isDonation && (
                    <>
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
                            error={errors.contract?.message}
                          />
                        )}
                      />
                      <Controller
                        name="date_of_contract_signing"
                        control={control}
                        rules={{required: 'Ovo polje je obavezno'}}
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
                    </>
                  )}
                </FormRow>
                <FormRow>
                  {!isDonation && (
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
                  )}
                  <Controller
                    name="date_of_purchase"
                    control={control}
                    rules={{
                      required: 'Ovo polje je obavezno',
                      validate: value => {
                        const dateOfSigning = watch('date_of_contract_signing');
                        return dateOfSigning && value && new Date(value) >= dateOfSigning
                          ? 'Datum završetka ugovora ne može biti prije datuma zaključenja ugovora.'
                          : true;
                      },
                    }}
                    render={({field: {name, value, onChange}}) => (
                      <Datepicker
                        name={name}
                        selected={value ? new Date(value) : ''}
                        onChange={onChange}
                        placeholder=""
                        label={isDonation ? 'DATUM DONACIJE:' : 'DATUM NABAVKE:'}
                        isRequired
                        error={errors.date_of_purchase?.message}
                      />
                    )}
                  />
                  {!isDonation && (
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
                  )}
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
                {isDonation && (
                  <div>
                    <Input textarea {...register('donation_description')} label="NAPOMENA:" />
                    <FileUpload
                      variant="secondary"
                      onUpload={handleUpload}
                      note={<Typography variant="bodySmall" content="Fajlovi:" />}
                      buttonText="Dodaj fajl"
                      files={donationFiles}
                      style={{marginBlock: 15}}
                    />
                  </div>
                )}
              </FieldsContainer>
              <TooltipWrapper>
                <ButtonWrapper>
                  <Button
                    content={isDonation ? 'Donacija' : 'Generiši Excel'}
                    onClick={openDonationTableUpload}
                    variant="primary"
                  />
                </ButtonWrapper>
                {!isDonation && (
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
                )}
              </TooltipWrapper>
              {!isDonation && (
                <LeftWrapper>
                  <Links
                    onClick={handleSubmit(values => {
                      values.all_items = true;
                      onSubmit(values);
                    })}>
                    Učitaj sve
                  </Links>
                </LeftWrapper>
              )}
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
