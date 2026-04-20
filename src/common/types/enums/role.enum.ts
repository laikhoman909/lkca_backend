// Role enum - used for role-based access control
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
  
  // Helper function to check if a string is a valid role
  export function isValidRole(value: string): value is Role {
    return Object.values(Role).includes(value as Role);
  }