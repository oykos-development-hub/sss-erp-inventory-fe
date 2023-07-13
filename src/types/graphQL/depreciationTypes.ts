export interface DepreciationType {
  id: number;
  title: string;
  abbreviation: string;
  lifetime_in_months: number;
  description: string;
  color: string;
  icon: string;
}

export interface DepreciationTypesParams {
  page: number;
  size: number;
  id?: number;
}
