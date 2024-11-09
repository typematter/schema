import { describe, expect, it } from 'vitest';
import is from './is.js';

describe('is', () => {
	it('should return true for a valid NumberField object', () => {
		const field = { type: 'Number' };

		expect(is(field)).toBe(true);
	});

	for (const value of [null, undefined, 0, 1, '', 'true', 'false', {}, []]) {
		it('should return false for a non-`NumberField` value', () => {
			expect(is(value)).toBe(false);
		});
	}

	for (const type of ['Array', 'Boolean', 'Date', 'Object', 'String', 'Undefined']) {
		it('should return false for an object that does not have the `type` `"Number"`', () => {
			const field = { type };

			expect(is(field)).toBe(false);
		});
	}
});
