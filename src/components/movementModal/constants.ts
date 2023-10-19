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
  {id: 'allocation', title: 'Premještaj sredstava'},
];
