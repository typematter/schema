import { describe, expect, it } from 'vitest';
import is from './is.js';

describe('is', () => {
	it('should return true for a valid ArrayField object', () => {
		const field = { type: 'Array' };

		expect(is(field)).toBe(true);
	});

	for (const value of [null, undefined, 0, 1, '', 'true', 'false', {}, []]) {
		it('should return false for a non-`ArrayField` value', () => {
			expect(is(value)).toBe(false);
		});
	}

	for (const type of ['Boolean', 'Date', 'Number', 'Object', 'String', 'Undefined']) {
		it('should return false for an object that does not have the `type` `"Array"`', () => {
			const field = { type };

			expect(is(field)).toBe(false);
		});
	}
});
