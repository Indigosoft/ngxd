import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormSchemaBuilder } from './forms.builder';

@NgModule({})
export class NgxdFormsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxdFormsModule,
            providers: [
                FormSchemaBuilder
            ]
        };
    }
}
