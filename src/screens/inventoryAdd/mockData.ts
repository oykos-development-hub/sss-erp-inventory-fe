import {TableItemValues} from './types';

export const mockTableData: TableItemValues[] = [
  {
    id: '',
    class_type: {id: 1, title: 'Class 1'},
    depreciation_type: {id: 1, title: 'Amortizaciona grupa'},
    inventory_number: '5',
    title: 'Narudzbenica',
    serial_number: 's',
    gross_price: '150',
    description: 'll',
  },
  {
    id: '',
    class_type: null,
    depreciation_type: null,
    inventory_number: '5',
    title: 'Narudzbenica',
    serial_number: 's',
    gross_price: '150',
    description: '',
  },
];

export const mockMovableFormData = {
  supplier: {id: 1, title: 'Supplier'},
  date_of_purchase: '11.11.1111',
};

export const orderListOptions = [
  {id: 1, title: 'Narudzbenica 1'},
  {id: 2, title: 'Narudzbenica 2'},
];

export const supplierOptions = [
  {id: 1, title: 'Dobavljac 1'},
  {id: 2, title: 'Dobavljac 2'},
];
