import {ImmovableDetailsFormProps} from './types';

export const initialValues: ImmovableDetailsFormProps = {
  type: null,
  class_type_id: 1,
  depreciation_type_id: 1,
  supplier_id: 1,
  serial_number: '123',
  inventory_number: '',
  abbreviation: '',
  internal_ownership: true,
  office_id: 1,
  location: null,
  target_user_profile_id: 1,
  unit: '',
  amount: 1,
  limitation_id: '',
  net_price: 1,
  gross_price: 1,
  description: '',
  date_of_purchase: '',
  source: '',
  donor_title: '',
  invoice_number: 1,
  price_of_assessment: 1,
  date_of_assessment: '',
  lifetime_of_assessment_in_months: 1,
  active: true,
  deactivation_description: 1,
  invoice_file_id: '',
  file_id: '',
  square_area: 1,
  land_serial_number: '',
  ownership_scope: null,
  ownership_investment_scope: '',
  limitations_description: '',
  document: '',
  inventoryId: 0,
  class_type: null,
  depreciation_type: null,
  office: null,
  estate_serial_number: '',
  ownership_type: null,
  property_document: '',
  limitation: null,
  depreciation_rate: 0,
};

export const ownershipTypeOptions = [
  {id: 'Zemljište', title: 'Zemljište'},
  {id: 'Stambena zgrada', title: 'Stambena zgrada'},
  {id: 'Stambeni prostor', title: 'Stambeni prostor'},
  {id: 'Poslovni prostor', title: 'Poslovni prostor'},
];

export const locationOptions = [
  {id: 1, title: 'location 1'},
  {id: 2, title: 'location 2'},
];

export const ownershipScopeOptions = [
  {id: 1, title: 'Obim prava 1'},
  {id: 2, title: 'Obim prava 2'},
];

export const depreciationTypeOptions = [
  {id: 1, title: 'Group 1'},
  {id: 2, title: 'Group 2'},
];

export const restrictions = [
  {id: 1, title: 'Restriction 1'},
  {
    id: 2,
    title: 'Restriction 2',
  },
];
