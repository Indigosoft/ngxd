import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { COMPONENTS, PROVIDERS } from './icon.component';

@NgModule({
    imports: [ CommonModule, MatCardModule ],
    declarations: [ COMPONENTS ],
    entryComponents: [ COMPONENTS ],
    providers: [ PROVIDERS ]
})
export class IconTableColumnModule {}
