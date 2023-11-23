import {TableHead} from 'client-library';
import {TableItemValues} from './types';
import {DropdownDataString} from '../../types/dropdownData';

export const tableHeads: TableHead[] = [
  {title: 'Naziv', accessor: 'title', type: 'custom'},
  {title: 'Inv. broj', accessor: 'inventory_number', type: 'custom'},
  {title: 'Serijski Broj', accessor: 'serial_number', type: 'custom'},
  {title: 'Cijena', accessor: 'gross_price', type: 'custom'},
  {title: 'Klasa sredstava', accessor: 'class_type', type: 'custom'},
  {title: 'Amortizaciona grupa', accessor: 'depreciation_type', type: 'custom'},
  {title: 'Napomena', accessor: 'description', type: 'custom'},
  {title: '', accessor: 'TABLE_ACTIONS', type: 'tableActions'},
];

export const newTableItem: TableItemValues = {
  id: '',
  class_type: null,
  depreciation_type: null,
  inventory_number: '',
  title: '',
  serial_number: '',
  gross_price: '',
  description: '',
};

export const inventorySourceOptions: DropdownDataString[] = [
  {id: 'budzet', title: 'Budžet'},
  {id: 'donacija', title: 'Donacija'},
];

export const rightPropertyOptions = [
  {id: '1/1', title: '1/1'},
  {id: '1/2', title: '1/2'},
  {id: '1/3', title: '1/3'},
  {id: '2/3', title: '2/3'},
  {id: '3/4', title: '3/4'},
  {id: '1/50', title: '1/50'},
];

export const realEstateTypeOptions = [
  {id: 'Zemljište', title: 'Zemljište'},
  {id: 'Stambena zgrada', title: 'Stambena zgrada'},
  {id: 'Stambeni prostor', title: 'Stambeni prostor'},
  {id: 'Poslovni prostor', title: 'Poslovni prostor'},
];

export const restrictionOptions = [
  {id: true, title: 'Da'},
  {id: false, title: 'Ne'},
];

export const propertyDocumentOptions = [
  {id: 'Raspolaganje', title: 'Raspolaganje'},
  {id: 'Svojina', title: 'Svojina'},
];
