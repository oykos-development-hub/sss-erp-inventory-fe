import {StatusesForMovableInventory} from '../../constants';
import {DropdownDataBoolean, DropdownDataString} from '../../types/dropdownData';

export const movableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Eksterni revers'},
  {id: 'allocation', title: 'Interni revers'},
  {id: 'return', title: 'Razduženje'},
  {id: 'return-revers', title: 'Povrat sredstva'},
];

export const immovableTransactionOptions: DropdownDataString[] = [
  {id: 'revers', title: 'Interni revers'},
  {id: 'return-revers', title: 'Povrat reversa'},
];

export const smallTransactionOptions: DropdownDataString[] = [
  {id: 'return', title: 'Razduženje'},
  {id: 'allocation', title: 'Interni revers'},
];

export const filterStatusOptions: DropdownDataString[] = [
  {id: StatusesForMovableInventory.POSLATO, title: StatusesForMovableInventory.POSLATO},
  {id: StatusesForMovableInventory.PRIHVACENO, title: StatusesForMovableInventory.PRIHVACENO},
  {id: StatusesForMovableInventory.NEZADUZENO, title: StatusesForMovableInventory.NEZADUZENO},
  {id: StatusesForMovableInventory.ZADUZENO, title: StatusesForMovableInventory.ZADUZENO},
  {id: StatusesForMovableInventory.OTPISANO, title: StatusesForMovableInventory.OTPISANO},
];

export const filterExpireOptions: DropdownDataBoolean[] = [
  {id: false, title: 'Svi artikli'},
  {id: true, title: 'Istek amortizacije'},
];
