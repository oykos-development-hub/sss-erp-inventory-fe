import {ScreenTitles, titleMap} from '../constants';
import {InventoryTypeEnum} from '../types/inventoryType';

const useTitle = (pathname: string, type: InventoryTypeEnum | `${InventoryTypeEnum}`) => {
  const splittedPathname = pathname.split('/')[3];
  const screen: keyof ScreenTitles = splittedPathname
    ? (splittedPathname.split('-')[0] as keyof ScreenTitles)
    : 'overview';

  return titleMap[type][screen];
};

export default useTitle;
