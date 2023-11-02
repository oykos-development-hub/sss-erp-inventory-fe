import {TableHead} from 'client-library';

export const receiveModalTableHeads: TableHead[] = [
  {title: 'Redni broj', accessor: 'id'},
  {title: 'Inv. broj', accessor: 'inventory_number'},
  {title: 'Naziv', accessor: 'title'},
  {title: 'Serijski broj', accessor: 'serial_number'},
];

export const receiveImmovableModalTableHeads: TableHead[] = [
  {title: 'Redni broj', accessor: 'id'},
  {title: 'Lokacija', accessor: 'location'},
];
