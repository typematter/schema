import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

interface NumberField {
	readonly type: 'Number';
	readonly min?: number;
	readonly max?: number;
	readonly default?: number;
	readonly __numberField: unique symbol;
}

declare module '$types/schema-field-map.js' {
	export interface SchemaFieldMap {
		number: NumberField;
	}
}

const numberField = {
	is,
	valid,
	validate
};

export { numberField as default, type NumberField };
