import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;
  type: any;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user'));
    this.type = this.user.user.type; /* je déclare une variable type pour le utiliser dans des conditions*/
    console.log(this.user.user.type);
  }

  ngOnInit() {
  }

}
