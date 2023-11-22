import {Datepicker, Dropdown, Input, Tooltip} from 'client-library';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import {AddInventoryFormProps} from '../../screens/inventoryAdd/types';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import useProcurementContractArticles from '../../services/graphQL/publicProcurementContractArticles/usePublicProcurementContractArticles';
import usePublicProcurementContracts from '../../services/graphQL/publicProcurementContracts/usePublicProcurementContracts';
import {FieldsContainer, Form, FormRow} from '../../shared/formStyles';
import PlusButton from '../../shared/plusButton';
import {DropdownDataNumber} from '../../types/dropdownData';
import {PublicProcurementContracts} from '../../types/graphQL/publicProcurmentContract';
import {PublicProcurementContractArticles} from '../../types/graphQL/publicProcurmentContractArticles';
import {parseDate} from '../../utils/dateUtils';
import {TooltipWrapper} from './styles';
import {MovableAddFormProps} from './types';

const MovableAddForm = ({onFormSubmit, context}: AddInventoryFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm<MovableAddFormProps>();
  const [article, setArticle] = useState<DropdownDataNumber>({id: 0, title: ''});
  const supplier = watch('supplier');
  const contract = watch('contract');
  const onSubmit = (values: MovableAddFormProps) => {
    const articleFind = articles.items.find((item: PublicProcurementContractArticles) => item.id === article?.id);

    if (articleFind) {
      values.articles = {
        id: articleFind.public_procurement_article.id,
        title: articleFind.public_procurement_article.title,
        total_price: Number(articleFind.gross_value) / articleFind.amount,
      };
      useArticle(articleFind.id);
      setArticle({id: 0, title: ''});
    }

    onFormSubmit(values);
  };
  const orgUnitId = context.contextMain.organization_unit.id;
  const {options: locationOptions} = useOrgUnitOfficesGet({
    page: 1,
    size: 1000,
    organization_unit_id: Number(orgUnitId),
  });

  const {data: contracts, options: contractOptions, fetch: fetchContracts} = usePublicProcurementContracts();
  const {data: articles, options: articlesOptions, fetch: fetchArticles, useArticle} = useProcurementContractArticles();

  useEffect(() => {
    if (supplier?.id) fetchContracts(supplier?.id);
  }, [supplier]);

  useEffect(() => {
    if (contract?.id) fetchArticles(contract?.id);
    const fullContract = contracts?.items?.find((item: PublicProcurementContracts) => item.id === contract?.id);
    if (fullContract) {
      setValue('date_of_contract_signing', new Date(fullContract.date_of_signing));
      setValue('date_of_conclusion', new Date(fullContract.date_of_expiry));
      setValue('invoice_number', fullContract.serial_number);
      setValue('source', {id: 'budzet', title: 'Budžet'});
    }
  }, [contract]);

  const {suppliers} = useSuppliersOverview();

  return (
    <Form>
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
                error={errors.supplier?.message}
              />
            )}
          />
        </FormRow>
        <FormRow>
          <Controller
            name="date_of_contract_signing"
            control={control}
            rules={{required: 'Ovo polje je obavezno'}}
            disabled={!!contract?.id}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                name={name}
                value={value ? parseDate(value) : ''}
                onChange={onChange}
                placeholder=""
                label="DATUM POTPISIVANJA UGOVORA:"
                error={errors.date_of_contract_signing?.message}
                disabled={!!contract?.id}
              />
            )}
          />
          <Controller
            name="date_of_conclusion"
            control={control}
            rules={{required: 'Ovo polje je obavezno'}}
            disabled={!!contract?.id}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                name={name}
                value={value ? parseDate(value) : ''}
                onChange={onChange}
                placeholder=""
                label="DATUM ZAKLJUČENJA UGOVORA:"
                error={errors.date_of_conclusion?.message}
                disabled={!!contract?.id}
              />
            )}
          />
          <Input
            {...register('invoice_number', {required: 'Ovo polje je obavezno'})}
            label="BROJ RAČUNA NABAVKE:"
            error={errors.invoice_number?.message}
            disabled={!!contract?.id}
          />
        </FormRow>
        <FormRow>
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
                label="DATUM NABAVKE"
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
                error={errors.office?.message}
              />
            )}
          />
        </FormRow>
      </FieldsContainer>

      <TooltipWrapper>
        <Dropdown
          onChange={item => {
            setArticle({id: Number(item.id), title: item.title?.toString() || ''});
          }}
          options={articlesOptions}
          placeholder="Izaberi artikal"
          label="Artikli"
          value={article}
          error={errors.source?.message}
          isDisabled={!articlesOptions || articlesOptions.length == 0}
          className="width200"
        />
        {contract && contract.id !== 0 ? (
          <PlusButton onClick={handleSubmit(onSubmit)} />
        ) : (
          <Tooltip
            style={{width: '200px'}}
            variant="filled"
            position="topLeft"
            content={'Funkcionalnost je onemogućena zbog odabira ugovora.'}>
            <PlusButton onClick={handleSubmit(onSubmit)} disabled={!!contract && contract?.id !== 0} />
          </Tooltip>
        )}
      </TooltipWrapper>
    </Form>
  );
};
export default MovableAddForm;
