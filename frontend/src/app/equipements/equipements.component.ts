import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipement } from '../shared/modeles/equipement';
import { EquipementService } from '../shared/services/equipement.service';
import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.css']
})
export class EquipementsComponent implements OnInit {

  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

  equipements:Equipement[];
  equipement:Equipement; 
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  user: any;
  type: any;

  constructor(private equipementService:EquipementService,
    private router:Router,) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.type = this.user.user.type; /* je déclare une variable type pour le utiliser dans des conditions*/
    console.log('grade',this.user.user.type);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    setInterval( ()=>{
      this.getEquipements();
    },3000);
  } 
  
  getEquipements(): void {
    this.equipementService.getequipements()
        .subscribe(equipement =>{ this.equipements = equipement['equipements'];
          console.log(this.equipements);
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true
            this.dtTrigger.next();
          }
    });
  }

  deleteEquipement(equipement){
    this.equipementService.deleteEquipement(equipement).subscribe(
      data => {
        console.log(data);
        this.getEquipements();
      },
      error => console.log(error)
    );
  }

  equipementDetails(id: number){
    this.router.navigate(['show-equipement', id]);
  }

  EditEquipement(equipement){
    localStorage.setItem('equipement',JSON.stringify(equipement))
    this.router.navigate(['edit-equipement']);
  }
}