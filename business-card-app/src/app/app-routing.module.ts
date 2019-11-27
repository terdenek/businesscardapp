import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { CreateContactComponent } from './screens/create-contact/create-contact.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ContactDetailsComponent } from './screens/contact-details/contact-details.component';

const routes: Routes = [
  // specific screens
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate:[AuthGuardService]},
  { path: 'create', component: CreateContactComponent, canActivate:[AuthGuardService] },
  { path: 'contact/:id', component: ContactDetailsComponent, canActivate:[AuthGuardService] },
  // general
  { path: '**', component: NotFoundComponent },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
