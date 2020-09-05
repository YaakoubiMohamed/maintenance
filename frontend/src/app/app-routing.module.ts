import { DemandetechnicienComponent } from './demandetechnicien/demandetechnicien.component';
import { EditDemandeComponent } from './demandes/edit-demande/edit-demande.component';
import { RapportsComponent } from './rapports/rapports.component';
import { DemandesComponent } from './demandes/demandes.component';
import { EditPlanningComponent } from './planning/edit-planning/edit-planning.component';
import { AddPlanningComponent } from './planning/add-planning/add-planning.component';
import { EditEquipementComponent } from './equipements/edit-equipement/edit-equipement.component';
import { AddEquipementComponent } from './equipements/add-equipement/add-equipement.component';
import { PlanningComponent } from './planning/planning.component';
import { EquipementsComponent } from './equipements/equipements.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { MagasinComponent } from './magasin/magasin.component';
import { AddMagasinComponent } from './magasin/add-magasin/add-magasin.component';
import { EditMagasinComponent } from './magasin/edit-magasin/edit-magasin.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { AddDemandeComponent } from './demandes/add-demande/add-demande.component';
import { Role } from './shared/modeles/role';

const routes: Routes = [
  { path: '', component:LoginComponent },
    { path: '', component:LayoutsComponent,
      children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home', component:HomeComponent },
      { path: 'users', component:UsersComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.admin] } },
      { path: 'demandes', component:DemandesComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.admin] } },
      { path: 'add-demande', component:AddDemandeComponent },
      { path: 'edit-demande/:id', component:EditDemandeComponent },
      { path: 'demandestech', component:DemandetechnicienComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.mecanicien,Role.electricien] } },
      { path: 'rapports', component:RapportsComponent },
      { path: 'magasin', component:MagasinComponent },
      { path: 'add-magasin', component:AddMagasinComponent },
      { path: 'edit-magasin', component:EditMagasinComponent },
      { path: 'add-user', component:AddUserComponent },
      { path: 'edit-user', component:EditUserComponent },
      { path: 'equipements', component:EquipementsComponent },
      { path: 'add-equipement', component:AddEquipementComponent },
      { path: 'edit-equipement', component:EditEquipementComponent },
      { path: 'maintenance', component:PlanningComponent },
      { path: 'add-planning', component:AddPlanningComponent },
      { path: 'edit-planning', component:EditPlanningComponent },
    ] },
  { path: 'login', component:LoginComponent },
  { path: '**', redirectTo: '/HomeComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
