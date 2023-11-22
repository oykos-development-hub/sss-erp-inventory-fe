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
  {id: 'Nezadužen', title: 'Nezadužen'},
  {id: 'Zadužen', title: 'Zadužen'},
  {id: 'Deaktiviran', title: 'Deaktiviran'},
];
