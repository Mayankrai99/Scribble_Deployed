import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IArticle } from '../../../common/IProperty';
import { Property } from '../../../common/property';
import { Article } from '../../../common/article';
import { HousingService } from '../../../services/housing.service';


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
    uploadUrl: 'v1/image',
    }
  };

  constructor(private fb: FormBuilder, private router: Router, private housingService: HousingService) {}

  ngOnInit() {
    
    this.rteForm = this.fb.group({
      articlename: ['', [Validators.required, this.noWhitespaceValidator]],  // Article name field
      htmlContent: ['', [Validators.required, this.sanitizeRichTextContent]]   // Rich text editor content field
    });
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

  onSubmit() {

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
    this.article.description = this.rteForm.get('htmlContent')?.value || '';
    this.article.comments = [];
    
  }

  mapPropertyComments() {
    
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

  /* validateAndNavigate(tabId: number) {
    const currentTab = this.formTabs.tabs[tabId - 1];
    const formGroup = this.addPropertyForm?.form.get(
      currentTab?.id as string
    ) as FormGroup;

    if (formGroup) {
      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.controls[key];
        if (control) {
          control.markAsTouched();
        }
      });

      if (formGroup.valid) {
        this.selectTab(tabId);
      }
    }
  }

  private markAllAsTouched() {
    if (this.addPropertyForm) {
      Object.keys(this.addPropertyForm.controls).forEach((key) => {
        const control = this.addPropertyForm?.controls[key];
        if (control) {
          control.markAsTouched();
          if (control instanceof FormGroup) {
            this.markGroupAsTouched(control);
          }
        }
      });
    }
  }

  private markGroupAsTouched(group: FormGroup) {
    Object.keys(group.controls).forEach((key) => {
      const control = group.controls[key];
      if (control) {
        control.markAsTouched();
        if (control instanceof FormGroup) {
          this.markGroupAsTouched(control);
        }
      }
    });
  } */
}
