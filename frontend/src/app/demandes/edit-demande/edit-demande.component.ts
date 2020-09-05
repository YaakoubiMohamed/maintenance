import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/shared/modeles/demande';
import { DemandeService } from 'src/app/shared/services/demande.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Equipement } from '../../shared/modeles/equipement';
import { EquipementService } from '../../shared/services/equipement.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-demande',
  templateUrl: './edit-demande.component.html',
  styleUrls: ['./edit-demande.component.css']
})
export class EditDemandeComponent implements OnInit {

  demande: Demande = new Demande();
  registerForm: FormGroup;
  submitted = false;
  id:number;
  user:any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private demandeService: DemandeService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.demandeService.getDemande(this.id)
      .subscribe(data => {
        console.log(data)
        this.demande = data['demande'];
      }, error => console.log(error));

      this.registerForm = this.formBuilder.group({
        description_panne: [this.demande.description_panne, Validators.required],
        date: [this.demande.date, Validators.required],
        priorite: [this.demande.priorite, [Validators.required]],
        role: [this.demande.role, [Validators.required]],
        id_equipement: [this.demande.id_equipement, [Validators.required]],
        user_id: [this.user.id],
    });
  }

  newDemande(): void {
    this.submitted = false;
    this.demande = new Demande();
  }

  edit(id: number) {
    this.demandeService.updateDemande(this.registerForm.value, this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.demande = new Demande();
    this.gotoList();
  }

 

  gotoList() {
    this.router.navigate(['/demandes']);
  }



}
