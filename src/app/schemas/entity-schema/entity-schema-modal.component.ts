import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DynamicEntityObject } from '@app/dynamics';

@Component({
    selector: 'app-entity-schema-modal',
    templateUrl: 'entity-schema-modal.component.html'
})
export class EntitySchemaModalComponent {
    invalid: boolean;
    schema: DynamicEntityObject;

    constructor(@Inject(MAT_DIALOG_DATA) public defaultSchema: DynamicEntityObject) {}
}
