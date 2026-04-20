import { Role } from "src/common/types/enums/role.enum";


export class AuthResponseDto {
  
  accessToken: string;

  
  tokenType: string;

  
  expiresIn: string;

  
  user: {
    id: string;
    email: string;
    role: Role;
    publicKey: string;
  };
}