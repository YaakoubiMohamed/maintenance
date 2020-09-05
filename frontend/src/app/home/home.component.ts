import { Component, OnInit } from '@angular/core';
import { User } from '../shared/modeles/user';
import { Statistique } from '../shared/modeles/statistique';
import { first } from 'rxjs/operators';
import { UsersService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import * as CanvasJS from '../../assets/canvasjs.min';
import { Magasin } from '../shared/modeles/magasin';
import { MagasinService } from '../shared/services/magasin.service';
import { Equipement } from '../shared/modeles/equipement';
import { EquipementService } from '../shared/services/equipement.service';
import { StatistiqueService } from '../shared/services/statistique.service';

//import { Chart } from 'angular-highcharts';
import { Data } from './Data';
import { Chart } from 'chart.js';  


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  users: any;
  magasins:Magasin[];
  magasin:Magasin;
  equipements:Equipement[];
  equipement:Equipement;
  statistiques: Statistique[];
  statistique_pieces: Statistique[];
  month: string;
  mois: string;
  /*
  data : {
    y:number,
    name:string
  };
  */

  data1 : {
    y:number,
    name:string
  }[]; 

    data: Data[];  
    Player = [];  
    Run = []; 
    entre = [];
    texte = []  ;
    sortie = [];  
    barchart = [];  
  entrees: any;
  sorties: any;
  


    constructor(private userService: UsersService,
      private statistiqueService: StatistiqueService,
      private equipementService:EquipementService,
      private magasinService:MagasinService,
      private authenticationService: AuthenticationService) {
        this.users = JSON.parse(localStorage.getItem('userinfo'));
      //console.log(this.users.type);
    }    
    
    ngOnInit() {  
      this.getp();
      this.statistiqueService.getstat()
      .subscribe(statistique => { 
        this.statistiques = statistique['statistique'];
        console.log('statistiques',this.statistiques); 
        this.statistiques.forEach(x => {
          this.month = x.date;
          
            this.Player.push(this.month);
          this.Run.push(x.nbr);   
        });  
        this  
        this.barchart = new Chart('canvas', {  
          type: 'bar',  
          data: {  
            labels: this.Player,  
            datasets: [  
              {  
                data: this.Run,  
                borderColor: '#3cba9f',  
                backgroundColor: [  
                  "#3cb371",  
                  "#0000FF",  
                  "#9966FF",  
                  "#4C4CFF",  
                  "#00FFFF",  
                  "#f990a7",  
                  "#aad2ed",  
                  "#FF00FF",  
                  "Blue",  
                  "Red",  
                  "Blue"  
                ],  
                fill: true  
              }  
            ]  
          },  
          options: {
            title: {
              display: true,
              text: 'Statistique Equipements'
            },
            legend: {  
              display: true,
              labels: {
                  fontColor: 'rgb(255, 99, 132)'
              }  
            },  
            scales: {  
              xAxes: [{  
                display: true  
              }],  
              yAxes: [{
                ticks: {
                  beginAtZero: true
                },
                display: true  
              }],  
            }  
          }  
        });
      }); 
    }          
    
    getp()
    {
      this.statistiqueService.getstat()
      .subscribe(statistique => { 
        this.entrees = statistique['entrees'];
        this.sorties = statistique['sorties'];
        let nbrentres = Object.keys(this.entrees).length;
        let sorties = Object.keys(this.sorties).length;
        //console.log('statistiques',this.entrees);
        for (let i = 1; i <= nbrentres-1; i++) {
          //console.log(this.entrees[i]);
          //this.texte.push(this.entrees[i].entree);   
          this.entre.push(this.entrees[i]);  
        }
        for (let i = 1; i <= sorties-1; i++) {
          //console.log(this.sorties[i]);
          //this.texte.push(this.sorties[i].entree);   
          this.sortie.push(this.sorties[i]);  
        }
        //console.log('texte',this.texte);
        console.log('entre',this.entre);
        console.log('sortie',this.sortie);
        this  
        this.barchart = new Chart('pieces', {  
          type: 'bar',  
          data: {  
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'],  
            datasets: [
              { data: this.entre, label: 'Entree',backgroundColor: '#17522f', },
              { data: this.sortie, label: 'Sortie',backgroundColor: 'red', }
            ]
          },  
          options: {
            title: {
              display: true,
              text: 'Statistique Pieces'
            },
            legend: {  
              display: true,
              labels: {
                  fontColor: 'rgb(255, 99, 132)'
              }  
            }, 
            scales: { xAxes: [{}], yAxes: [{}] },  
          }  
        });
      }); 
    }

}
