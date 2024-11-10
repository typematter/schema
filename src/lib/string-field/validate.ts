import validationError from '$lib/validation-error/index.js';
import type { ValidationError } from '$types/validation-error.js';
import type { Validator } from '$types/validator.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate: Validator = (value, field, path = []) => {
	const errors: ValidationError[] = [];

	const error = pipe(withPath(path));

	if (!is(field)) {
		return [error(fromString('Expected string field'))];
	}

	if (typeof value !== 'string') {
		return [error(fromString(`Expected string value, got ${typeof value}`))];
	}

	if (field.enum && !field.enum.includes(value as string)) {
		errors.push(error(fromString(`Value must be one of: ${field.enum.join(', ')}`)));
	}

	if (field.pattern && !new RegExp(field.pattern).test(value as string)) {
		errors.push(error(fromString(`Value does not match pattern: ${field.pattern}`)));
	}

	return errors;
};

export default validate;
