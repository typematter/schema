import type { SchemaField } from '$lib/schema-field/index.js';
import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

interface ObjectField {
	readonly type: 'Object';
	readonly properties?: Record<string, SchemaField>;
	readonly required?: readonly string[];
	readonly default?: Record<string, unknown>;
	readonly __objectField: unique symbol;
}

declare module '$types/schema-field-map.js' {
	export interface SchemaFieldMap {
		object: ObjectField;
	}
}

const objectField = {
	is,
	valid,
	validate
} as const;

export { objectField as default, type ObjectField };
