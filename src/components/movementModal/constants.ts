import {DropdownDataString} from '../../types/dropdownData';

export const movableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Interni revers'},
  {id: 'allocation', title: 'Eksterni revers'},
  {id: 'return', title: 'Razduženje sredstva'},
  {id: 'return-revers', title: 'Povrat reversa'},
];

export const immovableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Interni revers'},
  {id: 'return-revers', title: 'Povrat reversa'},
];

export const smallTransactionOptions: DropdownDataString[] = [
  {id: 'return', title: 'Povrat sredstava'},
  {id: 'allocation', title: 'Eksterni revers'},
];

export const filterStatusOptions: DropdownDataString[] = [
  {id: 'Lager', title: 'Lager'},
  {id: 'Zadužen', title: 'Zadužen'},
  {id: 'Revers', title: 'Revers'},
  {id: 'Deaktiviran', title: 'Deaktiviran'},
];
