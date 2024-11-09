import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

interface StringField {
	readonly type: 'String';
	readonly pattern?: string;
	readonly enum?: readonly string[];
	readonly default?: string;
}

declare module '$types/schema-field-map.js' {
	export interface SchemaFieldMap {
		string: StringField;
	}
}

const stringField = {
	is,
	valid,
	validate
} as const;

export { stringField as default, type StringField };
