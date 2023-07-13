import {InventoryTypeEnum} from '../../types/inventoryType';
import {MicroserviceProps} from '../../types/micro-service-props';
import {InventoryDetails} from '../../types/graphQL/inventoryDetails';

export interface DetailsFormProps {
  data: InventoryDetails | null;
  context: MicroserviceProps;
  inventoryType: InventoryTypeEnum | `${InventoryTypeEnum}`;
  inventoryId: number;
  refetch?: () => void;
}
