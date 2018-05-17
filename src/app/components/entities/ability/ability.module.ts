import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { COMPONENTS, PROVIDERS } from './ability.component';

@NgModule({
    imports: [ CommonModule, MatCardModule, MatDividerModule ],
    declarations: [ COMPONENTS ],
    entryComponents: [ COMPONENTS ],
    providers: [ PROVIDERS ]
})
export class AbilityEntityModule {}
