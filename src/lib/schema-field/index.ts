import type { SchemaFieldMap } from '$types/schema-field-map.js';
import valid from './valid.js';
import validate from './validate.js';

type SchemaField = SchemaFieldMap[keyof SchemaFieldMap];

const schemaField = {
	valid,
	validate
} as const;

export { schemaField as default, type SchemaField };
