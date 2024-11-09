import { describe, expect, it } from 'vitest';
import is from './is.js';

describe('is', () => {
	it('should return true for a valid DateField object', () => {
		const field = { type: 'Date' };

		expect(is(field)).toBe(true);
	});

	for (const value of [null, undefined, 0, 1, '', 'true', 'false', {}, []]) {
		it('should return false for a non-`DateField` value', () => {
			expect(is(value)).toBe(false);
		});
	}

	for (const type of ['Array', 'Boolean', 'Number', 'Object', 'String', 'Undefined']) {
		it('should return false for an object that does not have the `type` `"Date"`', () => {
			const field = { type };

			expect(is(field)).toBe(false);
		});
	}
});
