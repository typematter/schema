import is from './is.js';
import valid from './valid.js';
import validate from './validate.js';

const stringField = {
	is,
	valid,
	validate
} as const;

export { stringField as default };
