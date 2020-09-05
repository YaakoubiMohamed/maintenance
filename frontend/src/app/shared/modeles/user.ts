import { Role } from './role';
export class User {
    id: number;
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    password: string;
    type: Role;
    token?: string;
}
