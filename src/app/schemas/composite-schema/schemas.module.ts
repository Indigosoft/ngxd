import { NgModule } from '@angular/core';

import { CompositeSchemaBuilder, SchemaBuilderResolver } from './composite-schema.builder';

@NgModule({
    providers: [ CompositeSchemaBuilder, SchemaBuilderResolver ]
})
export class SchemasModule {}
