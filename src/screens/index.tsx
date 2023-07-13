import InventoryTabs from '../components/inventoryTabs/inventoryTabs';
import ScreenWrapper from '../shared/screenWrapper';
import {InventoryProps} from '../types/inventoryProps';

const Inventory = ({context, type}: InventoryProps) => {
  return (
    <ScreenWrapper>
      <InventoryTabs type={type} context={context} />
    </ScreenWrapper>
  );
};

export default Inventory;
