import { EquipementService } from './../../shared/services/equipement.service';
import { UsersService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Planning } from './../../shared/modeles/planning';
import { PlanningService } from './../../shared/services/planning.service';
import { Router } from '@angular/router';
import { Equipement } from './../../shared/modeles/equipement';
import { User } from './../../shared/modeles/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-planning',
  templateUrl: './add-planning.component.html',
  styleUrls: ['./add-planning.component.css']
})
export class AddPlanningComponent implements OnInit {

  planning: Planning;
  submitted = false;
  equipements:Equipement[];
  techniciens: User[];
  planningForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private planningService: PlanningService,
    private equipementService: EquipementService,
    private techService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.getEquipements();
    this.getTech();
    this.planningForm = this.formBuilder.group({
      date: ['', Validators.required],
      action: ['', Validators.required],
      equipement_id: ['', [Validators.required]],
      id_technicien: ['', [Validators.required]]
  });
  }

  get f() { return this.planningForm.controls; }

  newPlanning(): void {
    this.submitted = false;
    this.planning = new Planning();
  }

  save() {
    this.planningService.createPlanning(this.planning)
      .subscribe(data => console.log(data), error => console.log(error));
      console.log("planning",this.planning);
    this.planning = new Planning(); 
    
    //this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/maintenance']);
  }

  getEquipements(): void {
    this.equipementService.getequipements()
        .subscribe(equipement =>{ this.equipements = equipement['equipements'];
          console.log('equipements',this.equipements);
    });
  }

  getTech(): void {
    this.techService.getusers()
        .subscribe(tech =>{ this.techniciens = tech['users'];
          console.log('techniciens',this.techniciens);
    });
  }


}
