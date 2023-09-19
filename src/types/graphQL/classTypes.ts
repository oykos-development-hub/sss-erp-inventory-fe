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

export interface SettingsDropdownOverviewResponse {
  data: {
    settingsDropdown_Overview: {
      status?: string;
      message?: string;
      items?: SettingsDropdownOverview[];
    };
  };
}

export interface SettingsDropdownOverview {
  id: number;
  title: string;
  abbreviation?: string;
  description?: string;
  color?: string;
  icon?: string;
  entity: string;
  value?: string;
}
