import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';
import { DemandeService } from 'src/app/shared/services/demande.service';
import { Router } from '@angular/router';
import { Demande } from 'src/app/shared/modeles/demande';
import { Equipement } from '../../shared/modeles/equipement';
import { EquipementService } from '../../shared/services/equipement.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
    user:any;
    equipements: Equipement[];

    constructor(private formBuilder: FormBuilder,
      private demandeService: DemandeService,
      private equipementService:EquipementService,
      private router: Router) { }

    ngOnInit() {
      this.getEquipements();
      this.user = JSON.parse(localStorage.getItem('userinfo'));
        this.registerForm = this.formBuilder.group({
            description_panne: ['', Validators.required],
            date: ['', Validators.required],
            priorite: ['', [Validators.required]],
            role: ['', [Validators.required]],
            id_equipement: ['', [Validators.required]],
            user_id: [this.user.id],
        });
    }
    getEquipements(): void {
      this.equipementService.getequipements()
          .subscribe(equipement =>{ this.equipements = equipement['equipements'];
            console.log(this.equipements);          
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    save() {
      this.demandeService.createDemande(this.registerForm.value)
        .subscribe(data => console.log(data), error => console.log(error));      
      console.log(this.registerForm.value);
      //this.gotoList() ;   
    }
  
    onSubmit() {
      this.submitted = true;
      this.save();    
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    gotoList() {
      this.router.navigate(['/demandestech']);
    }
 
}
