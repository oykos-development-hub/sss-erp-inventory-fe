import {InventoryTypeEnum} from '../types/inventoryType';
import {MicroserviceProps} from '../types/micro-service-props';
import {NotFound404} from './404';
import InventoryAdd from './inventoryAdd/inventoryAdd';
import InventoryReceive from './inventoryDispatch/inventoryDispatch';
import InventoryOverview from './inventoryOverview/inventoryOverview';

interface InventoryRouterProps {
  context: MicroserviceProps;
  type: InventoryTypeEnum | `${InventoryTypeEnum}`;
}

const InventoryRouter = ({context, type}: InventoryRouterProps) => {
  const pathname = context?.navigation?.location?.pathname;

  const renderScreen = () => {
    if (pathname === `/inventory/${type}-inventory`) return <InventoryOverview context={context} type={type} />;
    if (pathname === `/inventory/${type}-inventory/add-inventory`)
      return <InventoryAdd context={context} type={type} />;
    if (pathname === `/inventory/${type}-inventory/receive-inventory`)
      return <InventoryReceive context={context} type={type} />;

    return <NotFound404 context={context} />;
  };

  return renderScreen();
};

export default InventoryRouter;
