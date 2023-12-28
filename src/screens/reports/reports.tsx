import {Button, Datepicker, Dropdown} from 'client-library';
import {Controller, Form, useForm} from 'react-hook-form';
import useAppContext from '../../context/useAppContext';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import useOrgUnitOfficesGet from '../../services/graphQL/organizationUnitOffices/useOrganizationUnitOfficesGet';
import useOrganizationUnits from '../../services/graphQL/organizationUnits/useOrganizationUnits';
import useGetReportInventoryList from '../../services/graphQL/reportInventoryList/useGetReportInventoryList';
import useGetReportInventoryListBasic from '../../services/graphQL/reportInventoryList/useGetReportInventoryListBasic';
import useGetReportInventoryListByClass from '../../services/graphQL/reportInventoryList/useGetReportInventoryListByClass';
import ScreenWrapper from '../../shared/screenWrapper';
import {InventoryReportType, extendedTypeOptions, inventoryReportOptions, typeOptions} from './constants';
import {parseDateForBackend} from '../../utils/dateUtils';
import {CustomDivider, MainTitle, Options, OptionsRow, FormContainer} from './styles';
import useInventoriesExpireOverview from '../../services/graphQL/inventoryOverview/useInventoriesExpireOverview';

export const InventoryReports = () => {
  const {
    control,
    watch,
    formState: {errors},
    handleSubmit,
  } = useForm();

  const {
    reportService: {generatePdf},
    contextMain,
    alert,
  } = useAppContext();

  const orgUnitId = contextMain?.organization_unit?.id;

  const {options: organizationUnits} = useOrganizationUnits();
  const {options: officeOptions} = useOrgUnitOfficesGet({organization_unit_id: orgUnitId});
  const {data} = useGetSettings({entity: 'inventory_class_type'});
  const {fetch: fetchInventoriesExpire} = useInventoriesExpireOverview();

  // for getting the data (number are types for which the query is used to get the data for the report)
  const {fetchReportInventory} = useGetReportInventoryList();
  // 0, 3
  const {fetchReportInventoryByClass} = useGetReportInventoryListByClass();
  // 2, 4
  const {fetchInventoryOverview, loading} = useGetReportInventoryListBasic();
  // 1, 5

  const reportType = watch('report_type')?.id;
  const inventoryType = watch('inventory_type')?.id;
  const organizationUnit = watch('organization_unit');

  const getReportData = (data: any) => {
    switch (reportType) {
      case InventoryReportType.ZeroValue:
        generateReportZeroValue();
        break;
      case InventoryReportType.Office:
        generateOffice(data);
        break;
    }
  };

  const generateOffice = (data: any) => {
    const date = parseDateForBackend(data?.date) || '';
    fetchReportInventory(data.organization_unit.id, date).then(reportInventory => {
      const reportData = {
        report: data.report_type,
        date: data.date,
        organization_unit: data.organization_unit,
        office: data.office,
        reportItems: reportInventory,
      };
      generatePdf('INVENTORY_BY_OFFICE', reportData);
    });
  };
  const generateReportZeroValue = () => {
    fetchInventoriesExpire(
      inventoryType === 'PS' ? 'movable' : 'immovable',
      data => {
        if (data.length > 0) {
          generatePdf('INVENTORY_ZERO_VALUE', {
            table_data: data,
            type: inventoryType,
            organization_unit: organizationUnit,
          });
        } else {
          alert.info('Ne postoje sredstva čija je vrijednost 0.');
        }
      },
      organizationUnit.id,
    );
  };

  return (
    <ScreenWrapper>
      <FormContainer onSubmit={handleSubmit(getReportData)}>
        <MainTitle content="IZVJEŠTAJI" variant="bodyMedium" />
        <CustomDivider />

        <Options>
          <OptionsRow>
            <Controller
              control={control}
              name="report_type"
              rules={{required: 'Ovo polje je obavezno!'}}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  label="TIP IZVJEŠTAJA:"
                  value={value}
                  onChange={onChange}
                  options={inventoryReportOptions}
                  isRequired
                />
              )}
            />
          </OptionsRow>
          <OptionsRow>
            <Controller
              control={control}
              name="organization_unit"
              render={({field: {onChange, value}}) => (
                <Dropdown
                  label="ORGANIZACIONA JEDINICA:"
                  value={value}
                  onChange={onChange}
                  options={organizationUnits ?? []}
                />
              )}
            />

            {(reportType === InventoryReportType.ZeroValue || reportType === InventoryReportType.ByType) && (
              <Controller
                control={control}
                name="inventory_type"
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    label="TIP SREDSTVA:"
                    value={value}
                    onChange={onChange}
                    options={reportType === InventoryReportType.ZeroValue ? typeOptions : extendedTypeOptions}
                  />
                )}
              />
            )}
            {reportType === InventoryReportType.Office && (
              <Controller
                control={control}
                name="office"
                render={({field: {onChange, value}}) => (
                  <Dropdown label="KANCELARIJE:" value={value} onChange={onChange} options={officeOptions} />
                )}
              />
            )}
            {reportType === InventoryReportType.CumulativeClass && (
              <Controller
                control={control}
                name="class"
                render={({field: {onChange, value}}) => (
                  <Dropdown label="KLASA:" value={value} onChange={onChange} options={data?.items ?? []} />
                )}
              />
            )}
            {(reportType === InventoryReportType.Office || reportType === InventoryReportType.AllInventory) && (
              <Controller
                name="date"
                rules={{
                  required: {
                    value: reportType === InventoryReportType.AllInventory,
                    message: 'Ovo polje je obavezno!',
                  },
                }}
                control={control}
                render={({field: {onChange, name, value}}) => (
                  <Datepicker
                    onChange={onChange as any}
                    label="DATUM:"
                    name={name}
                    selected={value ? new Date(value) : ''}
                    error={errors.date?.message}
                  />
                )}
              />
            )}
          </OptionsRow>
        </Options>
        <Button content="Generiši izvještaj" style={{width: 'fit-content'}} type="submit" />
      </FormContainer>
    </ScreenWrapper>
  );
};
