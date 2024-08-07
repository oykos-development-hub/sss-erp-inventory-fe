import {initialInventoryTabs} from '../constants';

//TODO remove any and add routeName to Tab interface in devkit
export const getRouteName = (tabName: string) => {
  const tabIndex = initialInventoryTabs.findIndex(tab => tab.title === tabName);
  return initialInventoryTabs[tabIndex].routeName;
};
