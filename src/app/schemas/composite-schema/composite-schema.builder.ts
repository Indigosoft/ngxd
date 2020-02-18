import { Inject, Injectable, Injector, Type } from '@angular/core';
import { SchemaBuilder } from './schema.builder';
import { SCHEMA_BUILDER_PROVIDER, SchemaBuilderProvider } from './schema-builder.provider';
import {
  AbstractControlSchema,
  FormArraySchema,
  FormControlSchema,
  FormGroupSchema,
} from '@ngxd/forms';

@Injectable()
export class SchemaBuilderResolver {
  private providers: Map<Type<any>, Type<SchemaBuilder>>;
  private builders: Map<Type<any>, SchemaBuilder> = new Map();

  constructor(
    @Inject(SCHEMA_BUILDER_PROVIDER) providers: SchemaBuilderProvider[],
    private injector: Injector
  ) {
    this.providers = providers.reduce(
      (acc, provider) => acc.set(provider.type, provider.schemaBuilder),
      new Map()
    );
  }

  resolve(type: Type<any>): SchemaBuilder {
    const ctor = type.constructor as any;

    if (!this.builders.has(ctor)) {
      const builder: SchemaBuilder = this.injector.get(this.providers.get(ctor));

      this.builders.set(ctor, builder);
    }

    return this.builders.get(ctor);
  }
}

@Injectable()
export class CompositeSchemaBuilder {
  constructor(private resolver: SchemaBuilderResolver) {}

  schema(type: any): AbstractControlSchema {
    return this.resolver.resolve(type).schema(type);
  }

  extract(schema: AbstractControlSchema, rawValue: any): any {
    if (schema instanceof FormArraySchema) {
      return rawValue.map((value, index) => this.extract(schema.controls[index], value));
    }

    if (schema instanceof FormGroupSchema) {
      const ctor = schema.$type;
      const item = Object.keys(rawValue).reduce(
        (acc, key) => ({ ...acc, [key]: this.extract(schema.controls[key], rawValue[key]) }),
        {}
      );

      return new ctor(item);
    }

    if (schema instanceof FormControlSchema) {
      return rawValue;
    }

    return rawValue;
  }
}
