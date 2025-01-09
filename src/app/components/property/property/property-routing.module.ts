import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { PropertyListingComponent } from '../property-listing/property-listing.component';
import { ViewPropertyDetailsComponent } from '../view-property-details/view-property-details.component';

const routes: Routes = [
  { path: '', component: PropertyListingComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'view-property-detail/:id', component: ViewPropertyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
