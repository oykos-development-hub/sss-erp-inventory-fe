import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {InventoryItem} from '../../types/graphQL/inventoryOverview';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {parseDate} from '../../utils/dateUtils';
import {realEstateTypeOptions} from '../inventoryAdd/constants';
import {InventoryFilters, InventoryFiltersEnum} from './types';
import {TableHead, Typography} from 'client-library';

export const movableFilters: `${InventoryFiltersEnum}`[] = [
  'type',
  'amortization_group',
  'location',
  'status',
  'search',
  'expire',
];
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
  status: null,
  search: '',
  expire: null,
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
    renderContents: (_: any, item: InventoryItem) => {
      const title =
        item?.target_organization_unit?.id && item?.target_organization_unit?.id !== item?.organization_unit?.id
          ? item?.target_organization_unit?.title
          : item?.office?.title;
      return <Typography content={title} />;
    },
  },
  {
    title: 'Klasa sredstava',
    accessor: 'class_type',
    type: 'custom',
    renderContents: (class_type: DropdownDataNumber) => {
      return <Typography content={class_type?.title} />;
    },
  },
  {
    title: 'Amortizaciona grupa',
    accessor: 'depreciation_type',
    type: 'custom',
    renderContents: (depreciation_type: DropdownDataNumber) => {
      return <Typography content={depreciation_type?.title} />;
    },
  },
  {
    title: 'Nabavna Cijena',
    accessor: 'purchase_gross_price',
    type: 'custom',
    renderContents: data => <Typography content={`${data || '0'}€`} />,
  },
  {
    title: 'Trenutna Cijena',
    accessor: 'gross_price',
    type: 'custom',
    renderContents: data => <Typography content={`${data || '0'}€`} />,
  },
  {
    title: 'Obračun amortizacije',
    accessor: 'date_of_purchase',
    type: 'custom',
    renderContents: date => <Typography content={parseDate(date)} />,
  },
  {
    title: 'Datum procjene',
    accessor: 'date_of_assessments',
    type: 'custom',
    renderContents: date_of_assessments =>
      date_of_assessments ? <Typography content={parseDate(date_of_assessments)} /> : '',
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
    title: 'Status',
    accessor: 'status',
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
