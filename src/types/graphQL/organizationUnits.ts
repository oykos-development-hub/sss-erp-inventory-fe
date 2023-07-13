export interface OrganizationUnit {
  id: number;
  parent_id?: number;
  number_of_judges?: number;
  title: string;
  abbreviation?: string;
  description?: string;
  address?: string;
  color?: string;
  folder_id?: number;
  icon?: string;
}
