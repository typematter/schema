import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

interface DateField {
	readonly type: 'Date';
	readonly format?: 'ISO-8601';
	readonly default?: string;
	readonly __dateField: unique symbol;
}

declare module '$types/schema-field-map.js' {
	export interface SchemaFieldMap {
		date: DateField;
	}
}

const dateField = {
	is,
	valid,
	validate
};

export { dateField as default, type DateField };
