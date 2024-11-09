import { describe, expect, it } from 'vitest';
import is from './is.js';

describe('is', () => {
	it('should return true for a valid ObjectField object', () => {
		const field = { type: 'Object' };

		expect(is(field)).toBe(true);
	});

	for (const value of [null, undefined, 0, 1, '', 'true', 'false', {}, []]) {
		it('should return false for a non-`ObjectField` value', () => {
			expect(is(value)).toBe(false);
		});
	}

	for (const type of ['Array', 'Boolean', 'Date', 'Number', 'String', 'Undefined']) {
		it('should return false for an object that does not have the `type` `"Object"`', () => {
			const field = { type };

			expect(is(field)).toBe(false);
		});
	}
});
