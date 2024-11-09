declare const schemaField: {
    readonly valid: (value: unknown, field: unknown) => boolean;
    readonly validate: (value: unknown, field: unknown, path?: string[]) => ValidationError[];
};

declare const VALIDATION_ERROR_NAME = "ValidationError";
interface ValidationError extends Error {
    readonly name: typeof VALIDATION_ERROR_NAME;
    readonly path: readonly string[];
    readonly __validationError: unique symbol;
}

type ValidationErrorTransformer = (error: ValidationError) => ValidationError;

declare const validationError: {
    readonly create: (params: Omit<ValidationError, "name" | "__validationError">) => ValidationError;
    readonly fromError: (error: Error, path?: readonly string[]) => ValidationError;
    readonly fromString: (error: string, path?: readonly string[]) => ValidationError;
    readonly is: (error: unknown) => error is ValidationError;
    readonly pipe: (...transformers: ValidationErrorTransformer[]) => ValidationErrorTransformer;
    readonly withContext: (context: string) => ValidationErrorTransformer;
    readonly withPath: (path: readonly string[]) => ValidationErrorTransformer;
};

interface ArrayField {
    readonly type: 'Array';
    readonly items: SchemaField;
    readonly minItems?: number;
    readonly maxItems?: number;
    readonly default?: readonly unknown[];
    readonly __arrayField: unique symbol;
}

interface BooleanField {
    readonly type: 'Boolean';
    readonly default?: boolean;
    readonly __booleanField: unique symbol;
}

interface DateField {
    readonly type: 'Date';
    readonly format?: 'ISO-8601';
    readonly default?: string;
    readonly __dateField: unique symbol;
}

interface NumberField {
    readonly type: 'Number';
    readonly min?: number;
    readonly max?: number;
    readonly default?: number;
    readonly __numberField: unique symbol;
}

interface ObjectField {
    readonly type: 'Object';
    readonly properties?: Record<string, SchemaField>;
    readonly required?: readonly string[];
    readonly default?: Record<string, unknown>;
    readonly __objectField: unique symbol;
}

interface StringField {
    readonly type: 'String';
    readonly pattern?: string;
    readonly enum?: readonly string[];
    readonly default?: string;
    readonly __stringField: unique symbol;
}

interface SchemaFieldMap {
    ArrayField: ArrayField;
    BooleanField: BooleanField;
    DateField: DateField;
    NumberField: NumberField;
    ObjectField: ObjectField;
    StringField: StringField;
}
type SchemaField = SchemaFieldMap[keyof SchemaFieldMap];

export { type SchemaField, type ValidationError, schemaField as default, validationError };
