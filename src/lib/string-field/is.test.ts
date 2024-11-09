import { describe, expect, it } from 'vitest';
import is from './is.js';

describe('is', () => {
	it('should return true for a valid StringField object', () => {
		const field = { type: 'String' };

		expect(is(field)).toBe(true);
	});

	for (const value of [null, undefined, 0, 1, '', 'true', 'false', {}, []]) {
		it('should return false for a non-`StringField` value', () => {
			expect(is(value)).toBe(false);
		});
	}

	for (const type of ['Array', 'Boolean', 'Date', 'Object', 'Number', 'Undefined']) {
		it('should return false for an object that does not have the `type` `"String"`', () => {
			const field = { type };

			expect(is(field)).toBe(false);
		});
	}
});
