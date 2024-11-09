import validate from './validate.js';

const valid = (value: unknown, field: unknown): boolean => validate(value, field).length === 0;

export default valid;
