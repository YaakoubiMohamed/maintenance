import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { User } from '../shared/modeles/user';
import { UsersService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import {merge, fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;


  users:User[];
  user:User;
  post = [];
  //dataSource:any;
  //dataSource: MatTableDataSource<any>;
  data = [];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private userService:UsersService,
    private router:Router,) {
    
  }
  
 
  ngOnInit() { 
    //setInterval( ()=>{
      this.getUsers();
    //},3000);
  }
  
  getUsers(): void {
    this.userService.getusers()
        .subscribe(user =>{ this.users = user['users'];
          //this.data.push(this.users);
          console.log(this.users);
          //this.dataSource = new MatTableDataSource(this.users);
          //console.log(this.dataSource);
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

  

  deleteUser(user){
    this.userService.deleteUser(user).subscribe(
      data => {
        console.log(data);
        this.getUsers();
      },
      error => console.log(error)
    );
  }

  userDetails(id: number){
    this.router.navigate(['show-user', id]);
  }

  EditUser(user){ 
    localStorage.setItem('userinf',JSON.stringify(user))
    this.router.navigate(['/edit-user']);
  }

}