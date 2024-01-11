export const inventoryReportOptions = [
  {id: 0, title: 'Popisna lista osnovnih sredstava, materijala i sitnog inventara'},
  // org unit (mora biti odabrana jedna OJ)
  {id: 1, title: 'Izvještaj o sredstvima čija je vrijednost 0'},
  // org unit, tip (PS/NS)
  {id: 2, title: 'Izvještaj o kumulativnim vrijednostima imovine'},
  {id: 3, title: 'Izvještaj o pokretnoj imovini po kancelarijama'},
  // org unit, office
  {id: 4, title: 'Izvještaj o kumulativnim vrijednostima po klasama'},
  // org unit, class
  {id: 5, title: 'Izvještaj po tipu sredstva'},
  // tip (PS1, NS1, PS2, NS2)
];

export const typeOptions = [
  {id: 'PS', title: 'PS'},
  {id: 'NS', title: 'NS'},
];

export const extendedTypeOptions = [
  {id: 'PS1', title: 'PS1'},
  {id: 'NS1', title: 'NS1'},
  {id: 'PS2', title: 'PS2'},
  {id: 'NS2', title: 'NS2'},
];

export enum InventoryReportType {
  AllInventory = 0,
  ZeroValue = 1,
  Cumulative = 2,
  Office = 3,
  CumulativeClass = 4,
  ByType = 5,
}

export enum ReportType {
  REVERS = 'REVERS',
  PROCUREMENT_PLAN = 'PROCUREMENT_PLAN',
  PROCUREMENT_CONTRACT = 'PROCUREMENT_CONTRACT',
  MOVABLE_INVENTORY_REPORT = 'MOVABLE_INVENTORY_REPORT',
  IMMOVABLE_INVENTORY_REPORT = 'IMMOVABLE_INVENTORY_REPORT',
  ACCOUNTING_ORDER = 'ACCOUNTING_ORDER',
  MOVEMENT_RECEIPT = 'MOVEMENT_RECEIPT',
  CLASS_INVENTORIES_VALUES = 'CLASS_INVENTORIES_VALUES',
  ACCOUNTING_SPENDING = 'ACCOUNTING_SPENDING',
  INVENTORY_BY_OFFICE = 'INVENTORY_BY_OFFICE',
  INVENTORY_ZERO_VALUE = 'INVENTORY_ZERO_VALUE',
  INVENTORY_CUMULATIVE = 'INVENTORY_CUMULATIVE',
  INVENTORY_BY_TYPE = 'INVENTORY_BY_TYPE',
  ALL_INVENTORY = 'ALL_INVENTORY',
}
