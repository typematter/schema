import schema from '@typematter/schema';
import { describe, expect, it } from 'vitest';

describe('validate', () => {
	it('should validate an array', () => {
		const errors = schema.validate([1, 2, 3], { type: 'Array', items: { type: 'Number' } });

		expect(errors.length).toBe(0);
	});

	it('should validate a boolean', () => {
		const errors = schema.validate(true, { type: 'Boolean' });

		expect(errors.length).toBe(0);
	});

	it('should validate a date', () => {
		const errors = schema.validate(new Date().toISOString(), { type: 'Date' });

		expect(errors.length).toBe(0);
	});

	it('should validate a number', () => {
		const errors = schema.validate(42, { type: 'Number' });

		expect(errors.length).toBe(0);
	});

	it('should validate an object', () => {
		const errors = schema.validate({ greeting: 'Hello, World!' }, { type: 'Object' });

		expect(errors.length).toBe(0);
	});

	it('should validate a string', () => {
		const errors = schema.validate('Hello, World!', { type: 'String' });

		expect(errors.length).toBe(0);
	});
});
