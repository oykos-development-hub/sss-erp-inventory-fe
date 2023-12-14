import {Button, Dropdown} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {Container, CustomDivider, MainTitle, Options, OptionsRow} from './styles';
import ScreenWrapper from '../../shared/screenWrapper';
import {InventoryReportOptions} from './constants';

export const InventoryReports = () => {
  const {control} = useForm();

  return (
    <ScreenWrapper>
      <Container>
        <MainTitle content="IZVJEŠTAJI" variant="bodyMedium" />
        <CustomDivider />

        <Options>
          <OptionsRow>
            <Controller
              control={control}
              name="type"
              rules={{required: 'Ovo polje je obavezno!'}}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  label="TIP IZVJEŠTAJA"
                  value={value}
                  onChange={onChange}
                  options={InventoryReportOptions}
                  isRequired
                />
              )}
            />
          </OptionsRow>
        </Options>

        <Button content="Generiši izvještaj" style={{width: 'fit-content'}} />
      </Container>
    </ScreenWrapper>
  );
};
