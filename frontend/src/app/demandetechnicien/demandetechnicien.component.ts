import { RapportService } from './../shared/services/rapport.service';
import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../shared/services/demande.service';
import { Router } from '@angular/router';
import { Demande } from '../shared/modeles/demande';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Rapport } from '../shared/modeles/rapport';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-demandetechnicien',
  templateUrl: './demandetechnicien.component.html',
  styleUrls: ['./demandetechnicien.component.css'],
  providers: [DatePipe]
})
export class DemandetechnicienComponent implements OnInit {

  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

  demandes:Demande[];
  demande:Demande; 
  model: any;
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
  user: any;
  type: any;
  submitted: boolean;
  rapport: Rapport = new Rapport();
  date: Date;
  today = new Date();
  date_fin = new Date();
  mydate: string; 
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  action:any;
  etat: string;

  constructor(private demandeService:DemandeService,
    private router:Router,
    private datePipe: DatePipe,
    public rapportService: RapportService,
    private modalService: NgbModal) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }

     
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    //console.log('user',this.user.user.type);
    this.type = this.user.user.type;
    //console.log(this.type);
    this.mydate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    //console.log(this.mydate);
    this.rapport.date_fin_intervention = this.mydate;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    //setInterval( ()=>{
      this.getDemandes();
    //},3000);
  } 
  newDemande(): void {
    this.submitted = false;
    this.rapport = new Rapport();
  }

  save() {
        this.rapport.date = (<HTMLInputElement>document.getElementById("dat")).value;

console.log(this.rapport);
    this.rapportService.createRapport(this.rapport)
      .subscribe(data => console.log(data), error => console.log(error));
    this.rapport = new Rapport();
    console.log(this.rapport);    
    
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.modalService.dismissAll();
  }
  
  getDemandes(): void {
    this.demandeService.getdemandes()
        .subscribe(demande =>{ this.demandes = demande['demandes'];
          console.log('demande',this.demandes);
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

  Repportedemande(demande: Demande){
    console.log(demande);
    demande.etat = "reporter";
    this.demandeService.updateDemande(demande, demande.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.demande = new Demande();
  }

  demandeDetails(id: number){
    this.router.navigate(['show-demande', id]);
  }
  open(content,demande : Demande,etat:string) {
    this.etat = etat;
    console.log(this.etat);
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      //console.log(demande);
      demande.etat = etat;
    this.demandeService.updateDemande(demande, demande.id)
      .subscribe(data => console.log(data), error => console.log(error));
    //this.demande = new Demande();
    this.rapport.date = demande.date;
    console.log(demande.id_equipement);
    this.rapport.action = this.action;
    this.rapport.description = demande.description_panne;
    this.rapport.equipement_id = demande.id_equipement;
    this.rapport.user_id = demande.user_id;
    
    this.rapportService.createRapport(this.rapport)
      .subscribe(data => console.log(data), error => console.log(error));
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
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

  

  Confirmerdemande(demande : Demande){
    console.log(demande);
    demande.etat = "confirmer";
    this.demandeService.updateDemande(demande, demande.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.demande = new Demande();
  }

}
