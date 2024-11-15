import type { DateField } from '$types/date-field.js';

const is = (field: unknown): field is DateField =>
	field !== undefined &&
	field !== null &&
	typeof field === 'object' &&
	(field as DateField).type === 'Date';

export default is;
