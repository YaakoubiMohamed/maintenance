import { Component, OnInit } from '@angular/core';
import { Magasin } from 'src/app/shared/modeles/magasin';
import { Router } from '@angular/router';
import { MagasinService } from 'src/app/shared/services/magasin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-magasin',
  templateUrl: './add-magasin.component.html',
  styleUrls: ['./add-magasin.component.css']
})
export class AddMagasinComponent implements OnInit {

  magasin: Magasin;
  submitted = false;
  public magasinForm: FormGroup;

  constructor(private magasinService: MagasinService,
    public fb: FormBuilder,
    private router: Router) { }

    ngOnInit() {
      this.addForm();
    }
    addForm() {
      this.magasinForm = this.fb.group({
        nom: ['', [Validators.required]],
        code: ['', [Validators.required]],
        prix: ['', [Validators.required]],
        date_entre: ['', [Validators.required]],
        date_sortie: ['', [Validators.required]],
      });
    }
    get f() { return this.magasinForm.controls; }
  newMagasin(): void {
    this.submitted = false;
    this.magasin = new Magasin();
  }

  save() {
    this.magasinService.createMagasin(this.magasinForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.magasin = new Magasin();
    console.log(this.magasin);
    this.gotoList();    
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/magasin']);
  }

}
