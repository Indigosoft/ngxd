import { AbstractControlSchema } from '@ngxd/forms';

export abstract class SchemaBuilder {
    abstract schema(entity: any): AbstractControlSchema;
}
