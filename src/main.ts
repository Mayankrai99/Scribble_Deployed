import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';


registerLicense('ORg4AjUWIQA/Gnt2U1hhQlJBfV5CQmFWfFN0QXNYdVt5flRBcDwsT3RfQFljQH5Rd0FjX3xbd3VVQA==');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
