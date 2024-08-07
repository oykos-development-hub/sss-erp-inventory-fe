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

export enum MovableAddFormType {
  'CONTRACT' = 0,
  'INVOICE' = 1,
  'DONATION' = 2,
}

export const Type = [
  {id: MovableAddFormType.CONTRACT, title: 'Ugovor'},
  {id: MovableAddFormType.INVOICE, title: 'Faktura'},
  {id: MovableAddFormType.DONATION, title: 'Donacija'},
];
