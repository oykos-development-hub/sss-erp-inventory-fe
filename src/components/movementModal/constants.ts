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
  {id: 'Poslato', title: 'Poslato'},
  {id: 'Prihvaćeno', title: 'Prihvaćeno'},
  {id: 'Nezaduženo', title: 'Nezaduženo'},
  {id: 'Zaduženo', title: 'Zaduženo'},
  {id: 'Otpisan', title: 'Otpisan'},
];

export const filterExpireOptions: DropdownDataBoolean[] = [
  {id: false, title: 'Svi artikli'},
  {id: true, title: 'Istek amortizacije'},
];
