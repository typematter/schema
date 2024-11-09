import type { ValidationError } from '$lib/validation-error/index.js';
import { describe, expect, it, vi } from 'vitest';
import valid from './valid.js';
import validate from './validate.js';

vi.mock('./validate.js', () => ({
	default: vi.fn()
}));

describe('validate', () => {
	it('returns `true` if the field is validated without errors', () => {
		vi.mocked(validate).mockReturnValue([]);

		expect(valid('2024-01-01T12:34:56Z', { type: 'Date', format: 'ISO-8601' })).toBe(true);
	});

	it('returns `false` if the field is validated with errors', () => {
		vi.mocked(validate).mockReturnValue([{} as ValidationError]);

		expect(valid(true, { type: 'Unknown' })).toBe(false);
	});
});
