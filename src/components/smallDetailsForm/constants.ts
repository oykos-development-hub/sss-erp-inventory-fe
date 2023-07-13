import {DropdownDataString} from '../../types/dropdownData';
import {SmallDetailsFormProps} from './types';

export const initialValues: SmallDetailsFormProps = {
  inventoryType: '',
  class_type_id: 1,
  depreciation_type_id: 1,
  supplier_id: 1,
  real_estate: null,
  serial_number: '1',
  inventory_number: '',
  title: '',
  abbreviation: '',
  internal_ownership: true,
  office_id: 1,
  source: null,
  donor_title: '',
  invoice_number: 1,
  date_of_purchase: '',
  gross_price: 1,
  amount: 1,
  description: '',
  location: null,
  target_user_profile_id: 1,
  net_price: 1,
  square_area: 0,
  land_serial_number: '',
  ownership_documents: '',
  ownership_scope: '',
  ownership_investment_scope: '',
  property_document: '',
  limitations_description: '',
  lifetime_of_assessment_in_months: 1,
  file_id: '',
  document: '',
  unit: null,
};

export const unitOptions: DropdownDataString[] = [
  {
    id: 'kom.',
    title: 'kom.',
  },
];
