import { InjectionToken, Provider, Type } from '@angular/core';
import { SchemaBuilder } from './schema.builder';

export interface SchemaBuilderProvider {
  type: Type<any>;
  schemaBuilder: Type<SchemaBuilder>;
}

export const SCHEMA_BUILDER_PROVIDER = new InjectionToken<SchemaBuilderProvider[]>(
  'Schema Builder Provider'
);

export function provideSchemaBuilder<T>(
  type: Type<T>,
  schemaBuilder: Type<SchemaBuilder>
): Provider {
  return [
    schemaBuilder,
    { provide: SCHEMA_BUILDER_PROVIDER, useValue: { type, schemaBuilder }, multi: true },
  ];
}
