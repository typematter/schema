import type { NumberField } from '$types/number-field.js';

const is = (field: unknown): field is NumberField =>
	field !== undefined &&
	field !== null &&
	typeof field === 'object' &&
	(field as NumberField).type === 'Number';

export default is;
