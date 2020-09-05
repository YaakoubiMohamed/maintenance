import { PlanningService } from './../shared/services/planning.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Planning } from '../shared/modeles/planning';
import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

  planings:Planning[];
  planing:Planning; 
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  user: any;
  type: any;

  constructor(private planningService:PlanningService,
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
      this.getPlanings();
    },3000);
  } 
  
  getPlanings(): void {
    this.planningService.getplannings()
        .subscribe(planning =>{ this.planings = planning['maintenance_preventives'];
          console.log(this.planings);
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

  deletePlaning(planning){
    this.planningService.deletePlanning(planning).subscribe(
      data => {
        console.log(data);
        this.getPlanings();
      },
      error => console.log(error)
    );
  }

  planningDetails(id: number){
    this.router.navigate(['show-planning', id]);
  }

  EditPlaning(plan){
    localStorage.setItem('plan',JSON.stringify(plan))
    this.router.navigate(['edit-planning']);
  }




}
