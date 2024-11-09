import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

const objectField = {
	is,
	valid,
	validate
} as const;

export { objectField as default };
