import schemaField from '$lib/schema-field/index.js';
import type { ValidationError } from '$lib/validation-error/index.js';
import validationError from '$lib/validation-error/index.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate = (value: unknown, field: unknown, path: string[] = []): ValidationError[] => {
	const errors: ValidationError[] = [];

	const error = pipe(withPath(path));

	if (!is(field)) {
		return [error(fromString('Expected array field'))];
	}

	if (!Array.isArray(value)) {
		return [error(fromString(`Expected array value, got ${typeof value}`))];
	}

	if (field.minItems !== undefined && value.length < field.minItems) {
		errors.push(error(fromString(`Array must contain at least ${field.minItems} items`)));
	}

	if (field.maxItems !== undefined && value.length > field.maxItems) {
		errors.push(error(fromString(`Array must contain at most ${field.maxItems} items`, path)));
	}

	value.forEach((item, index) => {
		errors.push(...schemaField.validate(item, field.items, [...path, index.toString()]));
	});

	return errors;
};

export default validate;
