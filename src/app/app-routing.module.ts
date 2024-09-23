import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './components/property/add-property/add-property.component';
import { PropertyListingComponent } from './components/property/property-listing/property-listing.component';
import { ViewPropertyDetailsComponent } from './components/property/view-property-details/view-property-details.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyListingComponent,
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
  },
  {
    path: 'view-property-detail/:id',
    component: ViewPropertyDetailsComponent,
  },
  {
    path: 'user/login',
    component: UserLoginComponent,
  },
  {
    path: 'user/register',
    component: UserRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
