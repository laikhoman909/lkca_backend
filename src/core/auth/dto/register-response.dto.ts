import { Role } from "src/common/types/enums/role.enum";


export class RegisterResponseDto {
    nip: string;
    fullname: string;
    role: Role;
}