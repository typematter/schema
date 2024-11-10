import validationError from '$lib/validation-error/index.js';
import registry from '$lib/validator/registry.js';
import type { Validator } from '$types/validator.js';

const { fromString, pipe, withPath } = validationError;

const validate: Validator = (value, field, path = []) => {
	const error = pipe(withPath(path));

	if (field === undefined) {
		return [error(fromString('Expected field, got undefined'))];
	}

	if (field === null) {
		return [error(fromString('Expected field, got null'))];
	}

	if (typeof field !== 'object') {
		return [error(fromString(`Expected field to be an object, got ${typeof field}`))];
	}

	if ('type' in field === false) {
		return [error(fromString('Expected field to have a type property'))];
	}

	if (typeof field.type !== 'string') {
		return [
			error(fromString(`Expected field type property to be a string, got ${typeof field.type}`))
		];
	}

	const validator = registry[field.type];

	if (validator) {
		return validator(value, field, path);
	}

	return [error(fromString(`No validator found for field type ${field.type}`))];
};

export default validate;
