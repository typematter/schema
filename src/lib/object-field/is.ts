import type { ObjectField } from './index.js';

const is = (field: unknown): field is ObjectField =>
	field !== undefined &&
	field !== null &&
	typeof field === 'object' &&
	(field as ObjectField).type === 'Object';

export default is;
