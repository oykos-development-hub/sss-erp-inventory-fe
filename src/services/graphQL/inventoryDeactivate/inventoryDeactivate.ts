const inventoryDeactivate = `mutation($id: Int!, $deactivation_description: String) {
    basicInventory_Deactivate(id: $id, deactivation_description: $deactivation_description) {
        message
        status
    }
}`;

export default inventoryDeactivate;
