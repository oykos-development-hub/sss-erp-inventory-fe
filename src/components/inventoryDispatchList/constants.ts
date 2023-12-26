import {DropdownDataBoolean, DropdownDataString} from '../../types/dropdownData';

export const receiveInventoryType: DropdownDataString[] = [
  {id: 'revers', title: 'Revers'},
  {id: 'return-revers', title: 'Povraćaj'},
];

export const receiveInventoryStatus: DropdownDataBoolean[] = [
  {id: true, title: 'Prihvaćen'},
  {id: false, title: 'Na čekanju'},
];
