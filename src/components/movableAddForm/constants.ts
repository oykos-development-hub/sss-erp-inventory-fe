import {MovableAddFormProps} from './types';

export const initialValues: Omit<MovableAddFormProps, 'is_external_donation'> & {is_external_donation: boolean} = {
  office: undefined,
  invoice_number: '',
  supplier: undefined,
  date_of_purchase: undefined,
  source: undefined,
  articles: undefined,
  type: {id: 0, title: 'Ugovor'},
  donation_description: '',
  donation_files: [],
  is_external_donation: false,
  invoice_id: 0,
};

export const Type = [
  {id: 0, title: 'Ugovor'},
  {id: 1, title: 'Faktura'},
  {id: 2, title: 'Donacija'},
];
