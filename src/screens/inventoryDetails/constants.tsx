import React from 'react';
import {TableHead, Typography} from 'client-library';
import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {parseDate} from '../../utils/dateUtils';
import {DispatchType, DispatchTypeTitles, InventoryDispatch} from '../../types/graphQL/inventoryDispatch';
import {estimationTypeOptions} from '../../constants';

export const estimationTableHeads: TableHead[] = [
  {
    title: 'Tip procjene',
    accessor: 'type',
    type: 'custom',
    renderContents: type => (
      <Typography
        variant="bodyMedium"
        content={estimationTypeOptions.find((item: DropdownDataString) => item.id === type)?.title}
      />
    ),
  },
  {
    title: 'Vrijednost procjene',
    accessor: 'gross_price_difference',
    type: 'custom',
    renderContents: data => <Typography content={`${data || '0'}€`} />,
  },
  {
    title: 'Datum procjene',
    accessor: 'date_of_assessment',
    type: 'custom',
    renderContents: date => <Typography variant="bodyMedium" content={date ? parseDate(date) : ''} />,
  },
  {
    title: 'Ispravka vrijednosti',
    accessor: 'gross_price_new',
    type: 'custom',
    renderContents: data => <Typography content={`${data || '0'}€`} />,
  },
  {
    title: '',
    accessor: 'TABLE_ACTIONS',
    type: 'tableActions',
  },
];

export const movementsTableHeads: TableHead[] = [
  {
    title: 'Tip kretanja',
    accessor: '',
    type: 'custom',
    renderContents: (_: any, item: InventoryDispatch) => (
      <Typography variant="bodyMedium" content={DispatchTypeTitles[item.type]} />
    ),
  },
  {
    title: 'Lokacija',
    accessor: '',
    type: 'custom',
    renderContents: (_: any, item: InventoryDispatch) => (
      <Typography
        variant="bodyMedium"
        content={item.type === 'revers' ? item?.target_organization_unit?.title : item?.office?.title}
      />
    ),
  },
  {
    title: 'Korisnik sredstva',
    accessor: 'target_user_profile',
    type: 'custom',
    renderContents: target_user_profile => <Typography variant="bodyMedium" content={target_user_profile?.title} />,
  },
  {
    title: 'Datum',
    accessor: 'date',
    type: 'custom',
    renderContents: date => <Typography variant="bodyMedium" content={date ? parseDate(date) : ''} />,
  },
  {
    title: '',
    accessor: 'TABLE_ACTIONS',
    type: 'tableActions',
  },
];

export interface MovementsDetailsItems {
  id: number;
  dispatch_description: string;
  source_user_profile: DropdownDataNumber;
  target_user_profile: DropdownDataNumber;
  target_organization_unit: DropdownDataNumber;
}
