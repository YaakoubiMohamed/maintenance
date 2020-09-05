import { EquipementService } from './../../shared/services/equipement.service';
import { Component, OnInit } from '@angular/core';
import { Planning } from './../../shared/modeles/planning';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from './../../shared/services/planning.service';
import { Equipement } from './../../shared/modeles/equipement';
import { UsersService } from './../../shared/services/user.service';
import { User } from './../../shared/modeles/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-planning',
  templateUrl: './edit-planning.component.html',
  styleUrls: ['./edit-planning.component.css']
})
export class EditPlanningComponent implements OnInit {

  planning: Planning = new Planning();
  submitted = false;
  id:number;
  equipements:Equipement[];
  techniciens: User[];
  planningForm: FormGroup;
  plan:any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private planningService: PlanningService,
    private equipementService: EquipementService,
    private techService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.plan = JSON.parse(localStorage.getItem('plan'));


      this.getEquipements();
      this.getTech();

      this.planningForm = this.formBuilder.group({
        date: ['', Validators.required],
        action: [this.plan.action, Validators.required],
        equipement_id: ['', [Validators.required]],
        id_technicien: ['', [Validators.required]]
    });
  }
  get f() { return this.planningForm.controls; }

  newPlanning(): void {
    this.submitted = false;
    this.planning = new Planning();
  }

  edit() {
    this.planningService.updatePlanning(this.planning, this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.planning = new Planning();
    //this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.edit();    
  }

  gotoList() {
    this.router.navigate(['/maintenance']);
  }

  getEquipements(): void {
    this.equipementService.getequipements()
        .subscribe(equipement =>{ this.equipements = equipement['equipements'];
          console.log(this.equipements);
    });
  }

  getTech(): void {
    this.techService.getusers()
        .subscribe(tech =>{ this.techniciens = tech['users'];
          console.log('techniciens',this.techniciens);
    });
  }



}
