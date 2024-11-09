import type { ArrayField } from '$types/array-field.js';

const is = (field: unknown): field is ArrayField =>
	field !== undefined &&
	field !== null &&
	typeof field === 'object' &&
	(field as ArrayField).type === 'Array';

export default is;
