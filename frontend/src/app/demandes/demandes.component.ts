import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../shared/services/demande.service';
import { Router } from '@angular/router';
import { Demande } from '../shared/modeles/demande';
import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

  demandes:Demande[];
  demande:Demande;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private demandeService:DemandeService,
    private router:Router,) {
  } 
 
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    setInterval( ()=>{
      this.getDemandes();
    },3000);
  } 
  
  getDemandes(): void {
    this.demandeService.getdemandes()
        .subscribe(demande =>{ this.demandes = demande['demandes'];
          console.log(this.demandes);
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

  deleteDemande(demande){
    this.demandeService.deleteDemande(demande).subscribe(
      data => {
        console.log(data);
        this.getDemandes();
      },
      error => console.log(error)
    );
  }

  demandeDetails(id: number){
    this.router.navigate(['show-demande', id]);
  }

  EditDemande(id: number){
    this.router.navigate(['edit-demande', id]);
  }



}
