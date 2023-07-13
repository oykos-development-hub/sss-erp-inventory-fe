export interface ClassType {
  id: number;
  title: string;
  abbreviation: string;
  color: string;
  icon: string;
}

export interface ClassTypesParams {
  search?: string;
  id?: number;
  entity?: string;
}
