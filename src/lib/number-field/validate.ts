import validationError, { type ValidationError } from '$lib/validation-error/index.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate = (value: unknown, field: unknown, path: string[] = []): ValidationError[] => {
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
