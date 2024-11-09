import type { SchemaField } from './schema-field.js';

interface ObjectField {
	readonly type: 'Object';
	readonly properties?: Record<string, SchemaField>;
	readonly required?: readonly string[];
	readonly default?: Record<string, unknown>;
	readonly __objectField: unique symbol;
}

export type { ObjectField };
