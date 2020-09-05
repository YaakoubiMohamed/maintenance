import { Component, OnInit } from '@angular/core';
import { Equipement } from 'src/app/shared/modeles/equipement';
import { EquipementService } from 'src/app/shared/services/equipement.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-equipement',
  templateUrl: './add-equipement.component.html',
  styleUrls: ['./add-equipement.component.css']
})
export class AddEquipementComponent implements OnInit {

  equipement: Equipement;
  submitted = false;
  public equipForm: FormGroup;

  constructor(private equipementService: EquipementService,
    private router: Router,
    public fb: FormBuilder,) { }

    ngOnInit() {
      this.addForm();
    }
    addForm() {
      this.equipForm = this.fb.group({
        nom: ['', [Validators.required]],
        code: ['', [Validators.required]],
        etat: ['', [Validators.required]],
        date_acquisition: [''],
        date_mise_en_service: [''],
      });
    }

  newEquipement(): void {
    this.submitted = false;
  }
  
  get f() { return this.equipForm.controls; }

  save() {
    this.equipementService.createEquipement(this.equipForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    console.log('equipement',this.equipForm.value);
    //this.equipement = new Equipement();
    this.gotoList();    
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/equipements']);
  }


}
