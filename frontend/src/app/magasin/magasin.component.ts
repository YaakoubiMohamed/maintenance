import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magasin } from '../shared/modeles/magasin';
import { MagasinService } from '../shared/services/magasin.service';
import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {

  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

  magasins:Magasin[];
  magasin:Magasin;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  user: any;
  type: any;

  constructor(private magasinService:MagasinService,
    private router:Router,) {
    
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.type = this.user.user.type; /* je déclare une variable type pour le utiliser dans des conditions*/
    console.log('grade',this.user.user.type);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    setInterval( ()=>{
      this.getMagasins();
    },3000);
  } 
  
  getMagasins(): void {
    this.magasinService.getmagasins()
        .subscribe(magasin =>{ this.magasins = magasin['pieces'];
          console.log(this.magasins);
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

  deleteMagasin(magasin){
    this.magasinService.deleteMagasin(magasin).subscribe(
      data => {
        console.log(data);
        this.getMagasins();
      },
      error => console.log(error)
    );
  }

  magasinDetails(id,mag){
    localStorage.setItem('mag',JSON.stringify(mag))
    this.router.navigate(['show-magasin', id]);
  }

  EditMagasin(mag){
    localStorage.setItem('mag',JSON.stringify(mag))
    this.router.navigate(['/edit-magasin']);
  }


}
