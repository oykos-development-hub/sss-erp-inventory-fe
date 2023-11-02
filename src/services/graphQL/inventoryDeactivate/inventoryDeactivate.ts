const inventoryDeactivate = `mutation($id: Int!, $inactive: String, $deactivation_description: String) {
    basicInventory_Deactivate(id: $id,inactive: $inactive, deactivation_description: $deactivation_description) {
        message
        status
    }
}`;

export default inventoryDeactivate;
