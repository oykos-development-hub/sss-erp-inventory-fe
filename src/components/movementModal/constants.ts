import {StatusesForMovableInventory} from '../../constants';
import {DropdownDataBoolean, DropdownDataString} from '../../types/dropdownData';
import {DispatchType} from '../../types/graphQL/inventoryDispatch';

export const movableTransactionOptions: DropdownDataString[] = [
  {id: DispatchType.revers, title: 'Eksterni revers'},
  {id: DispatchType.allocation, title: 'Interni revers'},
  {id: DispatchType.return, title: 'Razduženje'},
  {id: DispatchType.returnRevers, title: 'Povrat sredstva'},
  {id: DispatchType.convert, title: 'Konvertovanje PS2 sredstva u PS1'},
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
  {id: StatusesForMovableInventory.ARHIVA, title: StatusesForMovableInventory.ARHIVA},
];

export const filterExpireOptions: DropdownDataBoolean[] = [
  {id: false, title: 'Svi artikli'},
  {id: true, title: 'Istek amortizacije'},
];
