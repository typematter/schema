import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

const arrayField = {
	is,
	valid,
	validate
} as const;

export { arrayField as default };
