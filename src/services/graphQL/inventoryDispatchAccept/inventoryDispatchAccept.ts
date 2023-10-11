const inventoryDispatchAccept = `mutation($dispatch_id: Int!) {
  basicInventoryDispatch_Accept(
      dispatch_id: $dispatch_id
      ) {
          message
          status
  }
}`;

export default inventoryDispatchAccept;
