import type { ArrayField } from './array-field.js';
import type { BooleanField } from './boolean-field.js';
import type { DateField } from './date-field.js';
import type { NumberField } from './number-field.js';
import type { ObjectField } from './object-field.js';
import type { StringField } from './string-field.js';

interface SchemaFieldMap {
	ArrayField: ArrayField;
	BooleanField: BooleanField;
	DateField: DateField;
	NumberField: NumberField;
	ObjectField: ObjectField;
	StringField: StringField;
}

type SchemaField = SchemaFieldMap[keyof SchemaFieldMap];

export type { SchemaField };
