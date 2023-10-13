import React from 'react';
import {TableHead, Typography} from 'client-library';
import {DropdownDataNumber} from '../../types/dropdownData';
import {parseDate} from '../../utils/dateUtils';
import {DispatchType, DispatchTypeTitles, InventoryDispatch} from '../../types/graphQL/inventoryDispatch';

export const estimationTableHeads: TableHead[] = [
  {
    title: 'Type',
    accessor: 'depreciation_type',
    type: 'custom',
    renderContents: depreciationType => <Typography variant="bodyMedium" content={depreciationType?.title} />,
  },
  {title: 'Vrijednost procjene', accessor: 'gross_price_difference'},
  {
    title: 'Datum procjene',
    accessor: 'date_of_assessment',
    type: 'custom',
    renderContents: date => <Typography variant="bodyMedium" content={date ? parseDate(date) : ''} />,
  },

  {title: 'Ispravka vrijednosti', accessor: 'gross_price_new'},
  {
    title: '',
    accessor: 'TABLE_ACTIONS',
    type: 'tableActions',
  },
];

export const movementsTableHeads: TableHead[] = [
  {
    title: 'Transakcija',
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
    title: 'Primalac',
    accessor: 'target_user_profile',
    type: 'custom',
    renderContents: target_user_profile => <Typography variant="bodyMedium" content={target_user_profile?.title} />,
  },
  {
    title: 'Datum',
    accessor: 'created_at',
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
