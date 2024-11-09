import type { SchemaField } from '$lib/schema-field/index.js';
import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

declare module '$types/schema-field-map.js' {
	export interface SchemaFieldMap {
		array: ArrayField;
	}
}

interface ArrayField {
	readonly type: 'Array';
	readonly items: SchemaField;
	readonly minItems?: number;
	readonly maxItems?: number;
	readonly default?: readonly unknown[];
	readonly __arrayField: unique symbol;
}

const arrayField = {
	is,
	valid,
	validate
} as const;

export { arrayField as default, type ArrayField };
