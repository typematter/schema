import type { StringField } from './index.js';

const is = (field: unknown): field is StringField =>
	field !== undefined &&
	field !== null &&
	typeof field === 'object' &&
	(field as StringField).type === 'String';

export default is;
