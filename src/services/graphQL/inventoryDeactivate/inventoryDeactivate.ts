const inventoryDeactivate = `mutation($id: Int!, $inactive: String, $deactivation_description: String, $file_id: Int) {
    basicInventory_Deactivate(id: $id,inactive: $inactive, deactivation_description: $deactivation_description, file_id: $file_id) {
        message
        status
    }
}`;

export default inventoryDeactivate;
