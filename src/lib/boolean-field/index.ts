import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

interface BooleanField {
	readonly type: 'Boolean';
	readonly default?: boolean;
	readonly __booleanField: unique symbol;
}

declare module '$types/schema-field-map.js' {
	export interface SchemaFieldMap {
		boolean: BooleanField;
	}
}

const booleanField = {
	is,
	valid,
	validate
} as const;

export { booleanField as default, type BooleanField };
