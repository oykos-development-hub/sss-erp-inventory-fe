export interface RoutePermission {
  title: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  route: string;
}
export const permissionActions = ['read', 'create', 'update', 'delete'] as const;
export type PermissionAction = (typeof permissionActions)[number];

export function checkRoutePermissions(permissions: RoutePermission[]): string[] {
  const allowedRoutes: string[] = [];

  if (permissions?.length) {
    permissions.forEach(permission => {
      if (permission?.read && permission?.route) allowedRoutes.push(permission.route);
    });
  }

  return allowedRoutes;
}

export function checkActionRoutePermissions(permissions: RoutePermission[], action: PermissionAction): string[] {
  const allowedRoutes: string[] = [];

  if (permissions?.length) {
    permissions.forEach(permission => {
      if (permission && permission[action] && permission.route) allowedRoutes.push(permission.route);
    });
  }

  return allowedRoutes;
}
// TODO check if there is a way to create this function only based on permissions
// export function hasFullAccess(permissions: RoutePermission[], route: string): boolean {
//   // Find the permission object for the given route
//   const routePermission = permissions.find(permission => permission.route === route);
//
//   // Check if all actions are true
//   if (routePermission) {
//     return permissionActions.every(action => routePermission[action]);
//   }
//
//   // Return false if the route doesn't exist in permissions
//   return false;
// }
