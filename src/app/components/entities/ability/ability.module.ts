import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule } from '@angular/material';

import { COMPONENT, PROVIDERS } from './ability.component';

@NgModule({
    imports: [ CommonModule, MatCardModule, MatDividerModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class AbilityEntityModule {}
