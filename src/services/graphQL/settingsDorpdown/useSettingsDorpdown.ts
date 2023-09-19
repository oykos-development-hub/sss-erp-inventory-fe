import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import {SettingsDropdownOverview} from '../../../types/graphQL/classTypes';

const useSettingsDropdownOverview = (search?: string, id?: number, entity?: string) => {
  const [settingsTypes, setSettingsTypes] = useState<SettingsDropdownOverview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSettingsTypes = async () => {
    if (!entity) return;
    const response = await GraphQL.getSettingsDropdownOverview(search, id, entity);
    const types = response?.items;
    setSettingsTypes(types as SettingsDropdownOverview[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettingsTypes();
  }, [search, entity]);

  return {settingsTypes: settingsTypes, loading, fetch: fetchSettingsTypes};
};

export default useSettingsDropdownOverview;
