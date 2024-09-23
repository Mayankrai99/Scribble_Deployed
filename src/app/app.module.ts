import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { PropertyCardComponent } from './components/property/property-card/property-card.component';
import { PropertyListingComponent } from './components/property/property-listing/property-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './components/property/add-property/add-property.component';
import { ViewPropertyDetailsComponent } from './components/property/view-property-details/view-property-details.component';
import { FeaturedListingCarouselComponent } from './components/property/featured-listing-carousel/featured-listing-carousel.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FilterPipe } from './components/pipes/filter.pipe';
import { SortPipe } from './components/pipes/sort.pipe';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { NgIf } from '@angular/common';
import {AngularEditorModule} from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    PropertyCardComponent,
    PropertyListingComponent,
    AddPropertyComponent,
    ViewPropertyDetailsComponent,
    FeaturedListingCarouselComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RichTextEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AngularEditorModule
  ],
  providers: [HousingService, UserService, AuthService, ToolbarService, LinkService, ImageService, HtmlEditorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
