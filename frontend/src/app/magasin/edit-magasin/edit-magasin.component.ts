import { Component, OnInit } from '@angular/core';
import { Magasin } from 'src/app/shared/modeles/magasin';
import { ActivatedRoute, Router } from '@angular/router';
import { MagasinService } from 'src/app/shared/services/magasin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-magasin',
  templateUrl: './edit-magasin.component.html',
  styleUrls: ['./edit-magasin.component.css']
})
export class EditMagasinComponent implements OnInit {

  magasin: Magasin;
  submitted = false;
  public magasinForm: FormGroup;
  public updateForm:FormGroup;
  id:any;
  mag:any;

  constructor(private magasinService: MagasinService,
    public fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute) { }

    addForm() {
      this.updateForm = this.fb.group({
        nom: [this.mag.nom, [Validators.required]],
        code: [this.mag.code, [Validators.required]],
        prix: [this.mag.prix, [Validators.required]],
        date_entre: [this.mag.date_entre, [Validators.required]],
        date_sortie: [this.mag.date_sortie, [Validators.required]],
      });
    }
     
    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
    console.log('id',this.id);
    this.mag = JSON.parse(localStorage.getItem('mag'));
    
    
      this.addForm();
    }
    
    get f() { return this.updateForm.controls; }

    save() {
      this.magasinService.updateMagasin(this.updateForm.value, this.mag.id)
      .subscribe(data => console.log('update',data), error => console.log(error));
    this.magasin = new Magasin();
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
