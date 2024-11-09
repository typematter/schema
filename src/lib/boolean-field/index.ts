import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

const booleanField = {
	is,
	valid,
	validate
} as const;

export { booleanField as default };
