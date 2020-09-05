import { Component, OnInit } from '@angular/core';
import { Equipement } from 'src/app/shared/modeles/equipement';
import { EquipementService } from 'src/app/shared/services/equipement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-equipement',
  templateUrl: './edit-equipement.component.html',
  styleUrls: ['./edit-equipement.component.css']
})
export class EditEquipementComponent implements OnInit {

  equipement: Equipement ;
  submitted = false;
  id:number;
  equipe:any;
  public equipForm: FormGroup;

  constructor(public fb: FormBuilder,
    private route: ActivatedRoute,
    private equipementService: EquipementService,
    private router: Router) { }

  ngOnInit() {
    this.equipe = JSON.parse(localStorage.getItem('equipement'));
    console.log(this.id);
    this.equipForm = this.fb.group({
      nom: [this.equipe.nom, [Validators.required]],
      code: [this.equipe.code, [Validators.required]],
      etat: [this.equipe.etat, [Validators.required]],
      date_acquisition: [this.equipe.date_acquisition],
      date_mise_en_service: [this.equipe.date_mise_en_service],
    });
  }

  newEquipement(): void {
    this.submitted = false;
  }

  edit() {
    this.equipementService.updateEquipement(this.equipForm.value, this.equipe.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }

  get f() { return this.equipForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.edit();    
  }
  gotoList() {
    this.router.navigate(['/equipements']);
  }
}