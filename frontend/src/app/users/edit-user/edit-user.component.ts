import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/modeles/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = new User();
  submitted = false;
  id:number;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.user = JSON.parse(localStorage.getItem('userinf'));

      this.userForm = this.formBuilder.group({
        nom: [this.user.nom, Validators.required],
        prenom: [this.user.prenom, Validators.required],
        email: [this.user.email, [Validators.required]],
        password: [this.user.password, [Validators.required]],
        adresse: [this.user.adresse, [Validators.required]],
        type: [this.user.type, [Validators.required]]
    });
  }

  get f() { return this.userForm.controls; }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  edit() {
    this.userService.updateUser(this.user, this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
    //this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.edit();    
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}