const dispatchInsert = `mutation($data: BasicInventoryDispatchMutation!) {
    basicInventoryDispatch_Insert(data: $data) {
        status 
        message 
        item {
            id
            type
            source_user_profile {
                id
                title
            }
            target_organization_unit {
                id
                title
            }
            source_organization_unit {
                id
                title
            }
            target_organization_unit {
                id
                title
            }
            office {
                id
                title 
            }
            is_accepted
            dispatch_description
            created_at
            updated_at
            file {
                id
                name
                type
            }
        }
    }
}`;
export default dispatchInsert;
