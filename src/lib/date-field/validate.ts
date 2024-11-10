import { isValidDate } from '$lib/date-field/date-format/iso8601.js';
import validationError from '$lib/validation-error/index.js';
import type { ValidationError } from '$types/validation-error.js';
import type { Validator } from '$types/validator.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate: Validator = (value, field, path = []) => {
	const errors: ValidationError[] = [];

	const error = pipe(withPath(path));

	if (!is(field)) {
		return [error(fromString('Expected date field'))];
	}

	if (typeof value !== 'string') {
		return [error(fromString(`Expected date value, got ${typeof value}`))];
	}

	if (field.format === 'ISO-8601' && isValidDate(value) === false) {
		errors.push(error(fromString('Invalid date format')));
	}

	return errors;
};

export default validate;
