import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IArticle } from '../../../common/IProperty';
import { Property } from '../../../common/property';
import { Article } from '../../../common/article';
import { HousingService } from '../../../services/housing.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
  
})
export class AddPropertyComponent implements OnInit {

  htmlContent = '';
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  rteForm!: FormGroup;

  //private rteEle!: RichTextEditorComponent;

  article = new Article();

  property = new Property();

  articlePreview: IArticle = {
    id: 0,
    name: '',
    description: {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '5rem',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    //upload: (file: File) => this.convertToBase64(file),
    }
  };

  loggedInUser: string | null = null;
  loggedInUserId: any;

  constructor(private fb: FormBuilder, private router: Router, private housingService: HousingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.rteForm = this.fb.group({
      articlename: ['', [Validators.required, this.noWhitespaceValidator]],  // Article name field
      htmlContent: ['', [Validators.required, this.sanitizeRichTextContent]]   // Rich text editor content field
    });

    this.loggedInUser = this.authService.getLoggedInUser();


  }

  onBack() {
    this.router.navigate(['/']);
  }

  noWhitespaceValidator(control: FormControl) {
    const value = control.value || '';
    const isValid = value.trim().length > 0; // Check if there's at least one non-whitespace character
    return isValid ? null : { invalidWhitespace: true }; // Return custom error if invalid
  }

  sanitizeRichTextContent(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    // Remove all HTML tags and decode entities
    const sanitizedContent = value.replace(/<[^>]*>/g, '').trim();
    return sanitizedContent.length > 0 ? null : { whitespace: true };
  }

  get inputField() {
    return this.rteForm.get('inputField');
  }

  getLoggedInUserId() {
      
      this.loggedInUser = localStorage.getItem('token');
      const usersData = JSON.parse(localStorage.getItem('Users') || '[]');
      const userSK = usersData.find((user: any) => user.userName === this.loggedInUser);
      console.log(localStorage);
      
      if (userSK) {
        console.log('User ID:', userSK.id);
        return userSK.id;
      } else {
        console.log('User not found');
        return null;
      }
      
      
    }

  onSubmit() {
    //const articleAuthorId = this.getLoggedInUserId();
    //const articleAuthorName = this.loggedInUser;

    this.mapProperty();
    this.housingService.addArticle(this.article);
    alert('Submitted');
    this.router.navigate(['/']);
    
  }

  onReset() {
    // Reset the form and repopulate with initial values
    this.rteForm.reset({
      articlename: this.articlePreview.name,
      htmlContent: this.articlePreview.description.placeholder
    });
  }

  mapProperty() {
    this.article.id = this.housingService.newArticleId();
    this.article.name = this.rteForm?.value.articlename || '';
    this.article.authorId = this.authService.getLoggedInUserId();
    this.article.author = this.loggedInUser;
    this.article.description = this.rteForm.get('htmlContent')?.value || '';
    //this.article.description = `<style>img { max-width: 100%; height: auto; }</style>` + this.article.description;
    this.article.dateOfPublish = new Date();
    this.article.comments = [];
    
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

  convertToBase64(file: File): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result as string;

        // Insert Base64 Image into the Editor Content
        const currentContent = this.rteForm.get('htmlContent')?.value || '';
        if(!currentContent.includes(base64String))
        {
          const newContent = `${currentContent}<img src="${base64String}" style="max-width: 100%; height: auto; width: 300px">`;
          this.rteForm.get('htmlContent')?.setValue(newContent);
        }
        

        // Return a properly formatted HttpResponse
        observer.next(new HttpResponse({ status: 200, body: { imageUrl: base64String } }));
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };
    });

  }

}
