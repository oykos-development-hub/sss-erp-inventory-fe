import {Tab} from '@oykos-development/devkit-react-ts-styled-components';
import {InventoryTypeEnum} from './types/inventoryType';
import {DropdownDataString} from './types/dropdownData';

interface ExtendedTab extends Tab {
  routeName: string;
}
export const inventoryTabs: ExtendedTab[] = [
  {id: 1, title: 'Pregled sredstava', routeName: '', disabled: false},
  {id: 2, title: 'Dodaj sredstvo', routeName: 'add-inventory', disabled: false},
  {id: 3, title: 'Primi sredstvo', routeName: 'receive-inventory', disabled: false},
];

export interface ScreenTitles {
  overview: string;
  add: string;
  receive: string;
}

export const titleMap: {[key in InventoryTypeEnum]: ScreenTitles} = {
  movable: {
    overview: 'Pregled pokretnih sredstava',
    add: 'Dodaj pokretno sredstvo',
    receive: 'Primi pokretno sredstvo',
  },
  immovable: {
    overview: 'Pregled nepokretnih sredstava',
    add: 'Dodaj nepokretno sredstvo',
    receive: 'Primi nepokretno sredstvo',
  },
  small: {
    overview: 'Pregled sitnog inventara',
    add: 'Dodaj sitni inventar',
    receive: 'Primi sitni inventar',
  },
};

export const PAGE_SIZE = 10;

export const estimationTypeOptions: DropdownDataString[] = [{id: 'financial', title: 'Finansijska procjena'}];

export enum StatusesForMovableInventory {
  POSLATO = 'Poslato',
  PRIHVACENO = 'Prihvaćeno',
  NEZADUZENO = 'Nezaduženo',
  ZADUZENO = 'Zaduženo',
  OTPISANO = 'Otpisano',
  ARHIVA = 'Arhiva',
}
