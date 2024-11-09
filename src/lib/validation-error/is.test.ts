import { describe, expect, it } from 'vitest';
import is from './is.js';

describe('is', () => {
	it('should return `true` for a valid ValidationError object', () => {
		const field = { name: 'ValidationError', message: 'mock error' };

		expect(is(field)).toBe(true);
	});

	it('should return `false` for an invalid ValidationError object', () => {
		const field = { name: 'ValidationError' };

		expect(is(field)).toBe(false);
	});
});
