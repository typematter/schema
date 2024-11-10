import arrayField from '$lib/array-field/index.js';
import booleanField from '$lib/boolean-field/index.js';
import dateField from '$lib/date-field/index.js';
import numberField from '$lib/number-field/index.js';
import objectField from '$lib/object-field/index.js';
import stringField from '$lib/string-field/index.js';
import type { Validator } from '$types/validator.js';

const registry: Record<string, Validator> = {
	Array: arrayField.validate,
	Boolean: booleanField.validate,
	Date: dateField.validate,
	Number: numberField.validate,
	Object: objectField.validate,
	String: stringField.validate
};

export default registry;
