import { Component, OnInit } from '@angular/core';
import { RapportService } from '../shared/services/rapport.service';
import { Router } from '@angular/router';
import { Rapport } from '../shared/modeles/rapport';
import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css'],
  providers: [DatePipe]
})
export class RapportsComponent implements OnInit {

  dtElement: DataTableDirective;

  isDtInitialized:boolean = false; 
  closeResult: string;
  modalOptions:NgbModalOptions;

  rapports:Rapport[];
  rapport:Rapport;
  rap:Rapport;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  action:any;
  id:number;
  date = new Date();
  user: any;
  type: any;
  dat:string;

  constructor(
    private datePipe: DatePipe,
    public rapportService: RapportService,
    private modalService: NgbModal,
    private router:Router,) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
  } 

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.type = this.user.user.type; /* je déclare une variable type pour le utiliser dans des conditions*/
    console.log('grade',this.user.user.type);
    this.dat = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    //setInterval( ()=>{
      this.getRapports();
    //},5000);
  } 
  
  getRapports(): void {
    this.rapportService.getrapports()
        .subscribe(rapport =>{ this.rapports = rapport['rapports'];
          //console.log(this.rapports);
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

  deleteRapport(rapport){
    this.rapportService.deleteRapport(rapport).subscribe(
      data => {
        console.log(data);
        this.getRapports();
      },
      error => console.log(error)
    );
  }

  rapportDetails(id: number){
    this.router.navigate(['show-rapport', id]);
  }

  EditRapport(id: number){
    this.router.navigate(['edit-rapport', id]);
  }
  open(content,val: Rapport) {
    
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      console.log('rapport',val.action);
    this.rap = new Rapport();
    this.rap.action = val.action;
    this.rap.date_fin_intervention = this.dat; 
    this.rap.id = val.id;
    
    
    this.rapportService.updateRapport(this.rap)
      .subscribe(data => console.log('update',data), error => console.log(error));
      this.closeResult = `Closed with: ${result}`;
      //console.log(this.closeResult);
    }, (reason) => {
      
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //console.log(this.closeResult);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
