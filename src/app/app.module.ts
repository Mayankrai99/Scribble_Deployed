import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HousingService } from './services/housing.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { NgIf } from '@angular/common';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
//import {AngularEditorModule} from '@kolkov/angular-editor';

@NgModule({ declarations: [
        AppComponent,
        TopNavComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgIf,
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        SocialLoginModule,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        ButtonsModule.forRoot(),
        BsDatepickerModule.forRoot()], providers: [
            {
                provide: 'SocialAuthServiceConfig',
                useValue: {
                  autoLogin: false,
                  lang: 'en',
                  providers: [
                    {
                      id: GoogleLoginProvider.PROVIDER_ID,
                      provider: new GoogleLoginProvider(
                        'clientId'
                      )
                    },
                    {
                      id: FacebookLoginProvider.PROVIDER_ID,
                      provider: new FacebookLoginProvider('948006640801219')
                    }
                  ],
                  onError: (err) => {
                    console.error(err);
                  }
                } as SocialAuthServiceConfig,
              },
            HousingService, UserService, AuthService, ToolbarService, LinkService, ImageService, HtmlEditorService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
