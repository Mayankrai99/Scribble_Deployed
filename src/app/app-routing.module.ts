import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/property/property/property.module').then(m => m.PropertyModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user/user.module').then(m => m.UserModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
