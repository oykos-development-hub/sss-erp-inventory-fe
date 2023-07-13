import {DropdownDataBoolean, DropdownDataNumber} from '../dropdownData';

export interface EmployeeListFilters {
  is_active?: DropdownDataBoolean | null;
  organization_unit_id?: DropdownDataNumber | null;
  job_position_id?: DropdownDataNumber | null;
  type?: DropdownDataNumber | null;
}

export interface UserProfileParams {
  page: number;
  size: number;
  id?: number;
  is_active?: boolean;
  organization_unit_id?: number;
  job_position_id?: number;
  name?: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  active: boolean;
  is_judge: boolean;
  is_judge_president: boolean;
  role: string;
  organization_unit: string;
  job_position: string;
  created_at: string;
  updated_at: string;
}
