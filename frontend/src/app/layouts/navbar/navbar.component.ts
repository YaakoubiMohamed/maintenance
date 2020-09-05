import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { Planning } from '../../shared/modeles/planning';
//import { ToastrService } from 'ngx-toastr';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  notifications:Planning[];
  notification:Planning; 
  nbr:any;
  user: any;
  id: any;
  nots:any;
  @Input() ida = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;
  options = {
    autoClose: true,
};

  constructor(
    public alertService: AlertService,
    //private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public notifservice:NotificationsService
  ) { 
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.user.id;
    console.log(this.id);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

  ngOnInit() {
    setInterval( ()=>{
      this.getnotification();
    },15000);

    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.ida)
    .subscribe(alert => {
        // clear alerts when an empty alert is received
         

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose) {
            setTimeout(() => this.removeAlert(alert), 10000);
        }
   });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            this.alertService.clear(this.ida);
        }
    });
  } 

  getnotification(): void {
    this.notifservice.getNotification()
        .subscribe(notification =>{ this.notifications = notification['maintenance_preventives'];
          console.log('notifications',this.notifications);
          
          this.nots = this.notifications.filter(
            (thing, i, arr) => arr.findIndex(t => t.id_technicien === this.id) === i
          );
          console.log('notif',this.nots[0]);
          this.nbr = Object.keys(this.nots).length;
          //console.log(this.nbr);
          //this.toastr.success("Hello, I'm the toastr message.")
          if(this.nbr >0)
          {
            let msg ="";
            let date ="";
            //msg = "<span id='left'>"+this.nots[0].action+"</span><span id='right'> "+this.nots[0].date."</span>";
            msg = this.nots[0].action;
            date = this.nots[0].date;
            this.alertService.success(msg,date,this.options)
          }
          
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
}

removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
        // fade out alert
        this.alerts.find(x => x === alert).fade = true;

        // remove alert after faded out
        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x !== alert);
        }, 250);
    } else {
        // remove alert
        this.alerts = this.alerts.filter(x => x !== alert);
    }
}

cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];
            
    const alertTypeClass = {
        [AlertType.Success]: 'alert alert-success',
        [AlertType.Error]: 'alert alert-danger',
        [AlertType.Info]: 'alert alert-info',
        [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
        classes.push('fade'); 
    }

    return classes.join(' ');
}

}
