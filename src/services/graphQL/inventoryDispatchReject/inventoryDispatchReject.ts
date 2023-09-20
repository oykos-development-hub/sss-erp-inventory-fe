const inventoryDispatchDelete = `mutation($id: Int!) {
  basicInventoryDispatch_Delete(id: $id) {
      message
      status
  }
}`;

export default inventoryDispatchDelete;
