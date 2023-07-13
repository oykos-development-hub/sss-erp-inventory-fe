import {DropdownDataString} from '../../types/dropdownData';

export const movableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Revers'},
  {id: 'return-revers', title: 'Povrat reversa'},
  {id: 'return', title: 'Povrat sredstava'},
  {id: 'allocation', title: 'Premještaj sredstava'},
];

export const immovableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Revers'},
  {id: 'return-revers', title: 'Povrat reversa'},
];

export const smallTransactionOptions: DropdownDataString[] = [
  {id: 'return', title: 'Povrat sredstava'},
  {id: 'allocation', title: 'Premještaj sredstava'},
];
