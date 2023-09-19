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

export interface SettingsDropdownOverviewFormValues extends Omit<SettingsDropdownOverview, 'id'> {
  id: number | null;
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

export interface SettingsDropdownOverviewInsertResponse {
  data: {
    settingsDropdown_Insert: {
      status?: string;
      message?: string;
      item?: SettingsDropdownOverview;
    };
  };
}

export interface SettingsDropdownOverviewDeleteResponse {
  data: {
    settingsDropdown_Delete: {
      status?: string;
      message?: string;
    };
  };
}
