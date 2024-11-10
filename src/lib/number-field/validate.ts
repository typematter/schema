import validationError from '$lib/validation-error/index.js';
import type { ValidationError } from '$types/validation-error.js';
import type { Validator } from '$types/validator.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate: Validator = (value, field, path = []) => {
	const errors: ValidationError[] = [];

	const error = pipe(withPath(path));

	if (!is(field)) {
		return [error(fromString('Expected number field'))];
	}

	if (typeof value !== 'number') {
		return [error(fromString(`Expected number value, got ${typeof value}`))];
	}

	if (field.min !== undefined && value < field.min) {
		errors.push(error(fromString(`Value must be >= ${field.min}`)));
	}

	if (field.max !== undefined && value > field.max) {
		errors.push(error(fromString(`Value must be <= ${field.max}`)));
	}

	return errors;
};

export default validate;
