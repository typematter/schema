import schemaField from '$lib/schema-field/index.js';
import validationError from '$lib/validation-error/index.js';
import type { ValidationError } from '$types/validation-error.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate = (value: unknown, field: unknown, path: string[] = []): ValidationError[] => {
	const errors: ValidationError[] = [];

	const error = pipe(withPath(path));

	if (!is(field)) {
		return [error(fromString('Expected object field'))];
	}

	if (value === undefined || value === null || typeof value !== 'object') {
		return [error(fromString(`Expected object value, got ${typeof value}`))];
	}

	field.required?.forEach((requiredProp) => {
		if (!(requiredProp in value)) {
			errors.push(error(fromString('Required property missing', [...path, requiredProp])));
		}
	});

	if (field.properties) {
		Object.entries(field.properties).forEach(([key, propSchema]) => {
			if (key in value) {
				errors.push(
					...schemaField.validate((value as Record<string, unknown>)[key], propSchema, [
						...path,
						key
					])
				);
			}
		});
	}

	return errors;
};

export default validate;
