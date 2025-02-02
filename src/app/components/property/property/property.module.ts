import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { PropertyListingComponent } from '../property-listing/property-listing.component';
import { ViewPropertyDetailsComponent } from '../view-property-details/view-property-details.component';
import { PropertyRoutingModule } from './property-routing.module';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ExploreAuthorComponent } from '../explore-author/explore-author.component';


@NgModule({
  declarations: [
    AddPropertyComponent,
    PropertyListingComponent,
    ViewPropertyDetailsComponent,
    PropertyCardComponent,
    ExploreAuthorComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PropertyRoutingModule,
    RichTextEditorModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    TabsModule,
  ]
})
export class PropertyModule { }
