import type { ValidationError } from '$types/validation-error.js';
import { describe, expect, it, vi } from 'vitest';
import valid from './valid.js';
import validate from './validate.js';

vi.mock('./validate.js', () => ({
	default: vi.fn()
}));

describe('validate', () => {
	it('returns `true` if the field is validated without errors', () => {
		vi.mocked(validate).mockReturnValue([]);

		expect(valid([1, 2, 3], { type: 'Array', items: { type: 'Number' } })).toBe(true);
	});

	it('returns `false` if the field is validated with errors', () => {
		vi.mocked(validate).mockReturnValue([{} as ValidationError]);

		expect(valid(true, { type: 'Unknown' })).toBe(false);
	});
});
