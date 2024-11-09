import { isValidDate } from '$lib/date-field/date-format/iso8601.js';
import type { ValidationError } from '$lib/validation-error/index.js';
import validationError from '$lib/validation-error/index.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate = (value: unknown, field: unknown, path: string[] = []): ValidationError[] => {
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
