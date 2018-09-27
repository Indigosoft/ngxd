import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatMenuModule } from '@angular/material';

import { COMPONENT, PROVIDERS } from './actions.component';

@NgModule({
    imports: [ CommonModule, MatMenuModule, MatButtonModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class ActionsTableColumnModule {}
