import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicFormGroupComponentBase, provideFormGroup } from '@app/dynamics';
import { AbstractControlSchema, FormGroupSchema } from '@ngxd/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupComponent extends DynamicFormGroupComponentBase {
  toArray<T>(object: { [key: string]: T }): T[] {
    return Object.keys(object).map(key => object[key]);
  }

  trackByKey(index, schema: AbstractControlSchema): string {
    return schema.key;
  }
}

export const COMPONENT = FormGroupComponent;
export const PROVIDERS = [provideFormGroup(FormGroupSchema, FormGroupComponent)];
