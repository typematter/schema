import valid from './valid.js';
import validate from './validate.js';

const schemaField = {
	valid,
	validate
} as const;

export { schemaField as default };
