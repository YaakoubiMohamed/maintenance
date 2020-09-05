export class Demande {
    public id_equipement: number;
    /*
    constructor(etat: string, user:number, desc:string, date:string,priorite, role:string) {
        this.etat = etat;
        this.user_id = user;
        this.description_panne = desc;
        this.date = date;
        this.priorite = priorite;
        this.role = role;
    }
*/
    constructor(){}
    id: number; 
    public description_panne: string; 
    public date: string; 
    public priorite: string;
    public etat: string; 
    public role: string ;
    public user_id : number ; 
}
