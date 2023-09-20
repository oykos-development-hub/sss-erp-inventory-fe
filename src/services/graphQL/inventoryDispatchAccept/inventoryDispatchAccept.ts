const InventoryDispatchAccept = `mutation($dispatch_id: Int!,$target_user_id: Int!) {
  basicInventoryDispatch_Accept(
      dispatch_id: $dispatch_id, 
      target_user_id: $target_user_id) {
          message
          status
  }
}`;

export default InventoryDispatchAccept;
