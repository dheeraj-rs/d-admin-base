import { UserRole } from '@/core/types/admin-layout';

/**
 * Helper to get data from layout-storage
 */
function getLayoutStorageState() {
  if (typeof window === 'undefined') return null;
  try {
    const storage = localStorage.getItem('layout-storage');
    if (storage) {
      const parsed = JSON.parse(storage);
      return parsed.state || null;
    }
  } catch (error) {
    console.error('Error reading layout-storage:', error);
  }
  return null;
}

/**
 * Get current user's role from localStorage or cookies
 */
export function getUserRole(): UserRole {
  if (typeof window === 'undefined') return UserRole.GUEST;

  try {
    // Try to get from layout-storage (new centralized store)
    const state = getLayoutStorageState();
    // if (state && state.currentUser) {
    //   const user = state.currentUser;
    //   return (user.role || user.globalRole || UserRole.GUEST) as UserRole;
    // }

    // Fallback to legacy 'user' storage just in case during migration (optional, but safe)
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return (user.role || user.globalRole || UserRole.GUEST) as UserRole;
    }
  } catch (error) {
    console.error('Error getting user role:', error);
  }

  return UserRole.GUEST;
}

// Public paths that don't require authentication
export const PUBLIC_PATHS = [
  '/',
  '/login',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

// Route permissions by role
const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/owner-dashboard': [UserRole.OWNER],
  '/admin-dashboard': [UserRole.OWNER, UserRole.ORG_ADMIN],
  '/dashboard': [UserRole.OWNER, UserRole.ORG_ADMIN, UserRole.GUEST],
  '/settings': [UserRole.OWNER, UserRole.ORG_ADMIN, UserRole.GUEST],
  '/organizations': [UserRole.OWNER],
  '/users': [UserRole.OWNER, UserRole.ORG_ADMIN],
  '/invitations': [UserRole.OWNER],
};

/**
 * Check if a user role has permission to access a route
 */
export function hasRoutePermission(
  pathname: string,
  role: UserRole | string
): boolean {
  const userRole = typeof role === 'string' ? (role as UserRole) : role;

  if (PUBLIC_PATHS.includes(pathname)) {
    return true;
  }

  // Owner has access to everything
  if (
    userRole === UserRole.OWNER ||
    (typeof role === 'string' && role === 'OWNER')
  ) {
    return true;
  }

  for (const [route, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route)) {
      return allowedRoles.includes(userRole);
    }
  }

  return true;
}

/**
 * Check if a user can access a page based on their role
 */
export function canAccessPageByRole(
  pathname: string,
  userRole: UserRole | string
): boolean {
  // Use the existing hasRoutePermission function
  return hasRoutePermission(pathname, userRole);
}
