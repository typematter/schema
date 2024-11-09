import arrayField from '$lib/array-field/index.js';
import booleanField from '$lib/boolean-field/index.js';
import dateField from '$lib/date-field/index.js';
import numberField from '$lib/number-field/index.js';
import objectField from '$lib/object-field/index.js';
import stringField from '$lib/string-field/index.js';
import validationError from '$lib/validation-error/index.js';
import type { ValidationError } from '$types/validation-error.js';

const { fromString, pipe, withPath } = validationError;

const validate: (value: unknown, field: unknown, path?: string[]) => ValidationError[] = (
	value,
	field,
	path = []
) => {
	const error = pipe(withPath(path));

	if (arrayField.is(field)) {
		return arrayField.validate(value, field, path);
	} else if (booleanField.is(field)) {
		return booleanField.validate(value, field, path);
	} else if (dateField.is(field)) {
		return dateField.validate(value, field, path);
	} else if (numberField.is(field)) {
		return numberField.validate(value, field, path);
	} else if (objectField.is(field)) {
		return objectField.validate(value, field, path);
	} else if (stringField.is(field)) {
		return stringField.validate(value, field, path);
	} else {
		return [error(fromString(`No validator found for field: ${JSON.stringify(field)}`))];
	}
};

export default validate;
