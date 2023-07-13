import {InventoryTypeEnum} from './inventoryType';
import {MicroserviceProps} from './micro-service-props';

export interface InventoryProps {
  context: MicroserviceProps;
  type: InventoryTypeEnum | `${InventoryTypeEnum}`;
}
