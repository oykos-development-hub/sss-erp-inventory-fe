const organizationUnitOfficesGet = `query OfficesOfOrganizationUnitsOverview( $id: Int, $organization_unit_id: Int, $search: String) {
  officesOfOrganizationUnits_Overview( id: $id, organization_unit_id: $organization_unit_id, search: $search) {
      status 
      message
      total 
      items {
          id
          title
          organization_unit {
              id
              title
          }
          abbreviation
          description
          color
          icon
      }
  }
}`;

export default organizationUnitOfficesGet;
