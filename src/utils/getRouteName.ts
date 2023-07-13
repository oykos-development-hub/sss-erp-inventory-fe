import {inventoryTabs} from '../constants';

//TODO remove any and add routeName to Tab interface in devkit
export const getRouteName = (tabName: string) => {
  const tabIndex = inventoryTabs.findIndex(tab => tab.title === tabName);
  return inventoryTabs[tabIndex].routeName;
};
