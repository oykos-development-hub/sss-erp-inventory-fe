import {MovableAddFormProps} from './types';

export const initialValues: MovableAddFormProps = {
  office: undefined,
  invoice_number: '',
  supplier: undefined,
  date_of_purchase: undefined,
  source: undefined,
  articles: undefined,
  type: {id: 0, title: 'Ugovor'},
};

export const Type = [
  {id: 0, title: 'Ugovor'},
  {id: 1, title: 'Faktura'},
];
