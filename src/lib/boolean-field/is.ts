import type { BooleanField } from '$types/boolean-field.js';

const is = (field: unknown): field is BooleanField =>
	field !== undefined &&
	field !== null &&
	typeof field === 'object' &&
	(field as BooleanField).type === 'Boolean';

export default is;
