import type { SchemaField } from './schema-field.js';

interface ArrayField {
	readonly type: 'Array';
	readonly items: SchemaField;
	readonly minItems?: number;
	readonly maxItems?: number;
	readonly default?: readonly unknown[];
	readonly __arrayField: unique symbol;
}

export type { ArrayField };
