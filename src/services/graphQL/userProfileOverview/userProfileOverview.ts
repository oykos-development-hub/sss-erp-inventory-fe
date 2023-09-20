const userProfileOverview = `query UserProfileOverview($id: Int, $is_active: Boolean, $organization_unit_id: Int, $job_position_id: Int, $name: String, $page: Int, $size: Int) {
  userProfiles_Overview(id: $id, is_active: $is_active, organization_unit_id: $organization_unit_id, job_position_id: $job_position_id, name: $name, page: $page, size: $size) {
      message
      status
      total
      items {
          id
          first_name
          last_name
          date_of_birth
          email
          phone
          active
          is_judge
          is_judge_president
          role {
              id
              title
          }
          organization_unit {
              id
              title
          }
          job_position {
              id
              title
          }
          created_at
          updated_at
      }
  }
}`;

export default userProfileOverview;
