import {DropdownDataString} from '../../types/dropdownData';

export const movableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Revers'},
  {id: 'allocation', title: 'Zaduženje sredstva'},
  {id: 'return', title: 'Razduženje sredstva'},
  {id: 'return-revers', title: 'Povrat reversa'},
];

export const immovableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Revers'},
  {id: 'return-revers', title: 'Povrat reversa'},
];

export const smallTransactionOptions: DropdownDataString[] = [
  {id: 'return', title: 'Povrat sredstava'},
  {id: 'allocation', title: 'Zaduženje sredstava'},
];

export const filterStatusOptions: DropdownDataString[] = [
  {id: 'Lager', title: 'Lager'},
  {id: 'Zadužen', title: 'Zadužen'},
  {id: 'Revers', title: 'Revers'},
  {id: 'Deaktiviran', title: 'Deaktiviran'},
];
