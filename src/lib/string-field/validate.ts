import validationError, { type ValidationError } from '$lib/validation-error/index.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate = (value: unknown, field: unknown, path: string[] = []): ValidationError[] => {
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
