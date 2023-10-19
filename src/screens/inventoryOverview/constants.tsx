import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {InventoryItem} from '../../types/graphQL/inventoryOverview';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {parseDate} from '../../utils/dateUtils';
import {realEstateTypeOptions} from '../inventoryAdd/constants';
import {InventoryFilters, InventoryFiltersEnum} from './types';
import {TableHead, Typography} from 'client-library';

export const movableFilters: `${InventoryFiltersEnum}`[] = ['type', 'amortization_group', 'location', 'search'];
export const immovableFilters: `${InventoryFiltersEnum}`[] = ['type', 'class', 'location', 'search'];
export const smallFilters: `${InventoryFiltersEnum}`[] = ['class', 'location', 'search'];

export const inventoryFilters: {[key in InventoryTypeEnum]: `${InventoryFiltersEnum}`[]} = {
  movable: movableFilters,
  immovable: immovableFilters,
  small: smallFilters,
};

const initialMovableFilters = {
  source_type: null,
  depreciation_type_id: null,
  office_id: null,
  search: '',
};

const initialImmovableFilters = {
  source_type: null,
  class_type_id: null,
  office_id: null,
  search: '',
};

const initialSmallFilters = {
  class_type_id: null,
  office_id: null,
  search: '',
};

export const initialInventoryFilters: {[key in InventoryTypeEnum]: InventoryFilters} = {
  movable: initialMovableFilters,
  immovable: initialImmovableFilters,
  small: initialSmallFilters,
};

export const movableTypeOptions: DropdownDataString[] = [
  {id: '', title: 'Svi tipovi'},
  {id: 'PS1', title: 'PS1'},
  {id: 'PS2', title: 'PS2'},
];

export const immovableTypeOptions: DropdownDataString[] = [
  {id: '', title: 'Svi tipovi'},
  {id: 'NS1', title: 'NS1'},
  {id: 'NS2', title: 'NS2'},
];

export const movableInventoryTableHeads: TableHead[] = [
  {title: 'Tip', accessor: 'source_type'},
  {title: 'Naziv', accessor: 'title'},
  {
    title: 'Lokacija',
    accessor: 'office',
    type: 'custom',
    renderContents: office => <Typography content={office?.title} />,
  },
  {title: 'Inv. broj', accessor: 'inventory_number'},
  {title: 'Cijena', accessor: 'gross_price'},
  {
    title: 'Datum nabavke',
    accessor: 'date_of_purchase',
    type: 'custom',
    renderContents: date => <Typography content={parseDate(date)} />,
  },
  {
    title: 'Status',
    accessor: 'status',
  },
];

export const immovableInventoryTableHeads: TableHead[] = [
  {title: 'Tip', accessor: 'source_type'},
  {
    title: 'Vrsta nepokretnosti',
    accessor: '',
    type: 'custom',
    renderContents: (_: any, item: InventoryItem) => (
      <Typography
        content={
          realEstateTypeOptions.find(option => option.id === item.real_estate?.type_id)?.title ??
          item.real_estate?.type_id
        }
      />
    ),
  },
  {
    title: 'Površina m2',
    accessor: '',
    type: 'custom',
    renderContents: (_: any, item: InventoryItem) => <Typography content={item.real_estate?.square_area} />,
  },
  {
    title: 'Amortizaciona grupa',
    accessor: 'depreciation_type',
    type: 'custom',
    renderContents: (value: DropdownDataNumber) => <Typography content={value.title} />,
  },
  {
    title: 'Lokacija',
    accessor: 'organization_unit',
    type: 'custom',
    renderContents: organization_unit => <Typography content={organization_unit?.title} />,
  },
  {
    title: 'Alokacija',
    accessor: 'target_organization_unit_id',
    type: 'custom',
    renderContents: target_organization_unit => <Typography content={target_organization_unit?.title} />,
  },
];

export const smallInventoryTableHeads: TableHead[] = [
  {title: 'Naziv', accessor: 'title'},
  {
    title: 'Klasa sredstava',
    accessor: 'class_type',
    type: 'custom',
    renderContents: classType => <Typography content={classType.title} />,
  },
  {
    title: 'Datum nabavke',
    accessor: 'date_of_purchase',
    type: 'custom',
    renderContents: date => <Typography content={parseDate(date)} />,
  },
  {
    title: 'Lokacija',
    accessor: 'office',
    type: 'custom',
    renderContents: office => <Typography content={office?.title} />,
  },
];
