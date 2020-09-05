import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddUserComponent } from './users/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './shared/services/jwt.interceptor';
import { ErrorInterceptor } from './shared/services/error.interceptor';
import { JarwisService } from './shared/services/jarwis.service';
import { TokenService } from './shared/services/token.service';
import { AuthService } from './shared/services/auth.service';
import { AfterLoginService } from './shared/services/after-login.service';
import { BeforeLoginService } from './shared/services/before-login.service';
import { MagasinComponent } from './magasin/magasin.component';
import { AddMagasinComponent } from './magasin/add-magasin/add-magasin.component';
import { EditMagasinComponent } from './magasin/edit-magasin/edit-magasin.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { EquipementsComponent } from './equipements/equipements.component';
import { PlanningComponent } from './planning/planning.component';
import { EditEquipementComponent } from './equipements/edit-equipement/edit-equipement.component';
import { AddEquipementComponent } from './equipements/add-equipement/add-equipement.component';
import { AddPlanningComponent } from './planning/add-planning/add-planning.component';
import { EditPlanningComponent } from './planning/edit-planning/edit-planning.component';
import { DemandesComponent } from './demandes/demandes.component';
import { RapportsComponent } from './rapports/rapports.component';
import { AddDemandeComponent } from './demandes/add-demande/add-demande.component';
import { EditDemandeComponent } from './demandes/edit-demande/edit-demande.component';
import { DemandetechnicienComponent } from './demandetechnicien/demandetechnicien.component';
import { ChartModule } from 'angular-highcharts';

import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataTablesModule} from 'angular-datatables';
//import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    LoginComponent,
    MagasinComponent,
    AddMagasinComponent,
    EditMagasinComponent,
    LayoutsComponent,
    EquipementsComponent,
    PlanningComponent,
    EquipementsComponent,
    AddEquipementComponent,
    EditEquipementComponent,
    AddPlanningComponent,
    EditPlanningComponent,
    DemandesComponent,
    RapportsComponent,
    AddDemandeComponent,
    EditDemandeComponent,
    DemandetechnicienComponent 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    //ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule,
    ChartModule,
    DataTablesModule

  ],
  providers: [
    JarwisService, TokenService, AuthService, AfterLoginService, BeforeLoginService,
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      //  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
