import {Datepicker, Dropdown, Button, Tooltip} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {inventorySourceOptions} from '../../screens/inventoryAdd/constants';
import useSuppliersOverview from '../../services/graphQL/getSuppliers/useGetSuppliers';
import {FieldsContainer, Form, FormRow} from '../../shared/formStyles';
import {MovableAddFormProps} from './types';
import {ButtonWrapper, LeftWrapper, Links, TooltipWrapper} from './styles';
import PlusButton from '../../shared/plusButton';

const MovableAddFormIvoice = () => {
  const {
    control,
    formState: {errors},
  } = useForm<MovableAddFormProps>();

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
                options={[]}
                onChange={onChange}
                label="FAKTURA:"
                isRequired
                error={errors.supplier?.message}
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
                label="DATUM FAKTURE:"
                isRequired
                error={errors.date_of_contract_signing?.message}
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
                options={[]}
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
          <Button content={'Donacija'} variant="primary" />
        </ButtonWrapper>
        <LeftWrapper>
          <Dropdown
            options={[]}
            placeholder="Izaberi artikal"
            label="Artikli"
            error={errors.source?.message}
            isDisabled
            className="width200"
          />

          <Tooltip
            style={{width: '200px'}}
            variant="filled"
            position="topLeft"
            content={'Funkcionalnost je onemogućena zbog odabira ugovora.'}>
            <PlusButton
              disabled
              onClick={() => {
                console.log('click');
              }}
            />
          </Tooltip>
        </LeftWrapper>
      </TooltipWrapper>

      <LeftWrapper>
        <Links>Učitaj sve</Links>
      </LeftWrapper>
    </Form>
  );
};
export default MovableAddFormIvoice;
