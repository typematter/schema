import validationError from '$lib/validation-error/index.js';
import registry from '$lib/validator/registry.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import validate from './validate.js';

vi.mock('$lib/validator/registry.js', () => ({
	default: {
		'mock type': vi.fn()
	}
}));

vi.mock('$lib/validation-error/index.js', () => ({
	default: {
		fromString: vi.fn(),
		pipe: vi.fn(),
		withPath: vi.fn()
	}
}));

describe('validate', () => {
	beforeEach(() => {
		vi.mocked(validationError.pipe).mockReturnValue(vi.fn().mockReturnValue('mock error'));
	});

	it('should validate a value with a known type', () => {
		validate('mock value', { type: 'mock type' });

		expect(vi.mocked(registry['mock type'])).toBeCalledWith(
			'mock value',
			{
				type: 'mock type'
			},
			[]
		);
	});

	it('should return an error for an invalid field type', () => {
		validate(true, { type: 'Unknown' });

		expect(vi.mocked(validationError.fromString)).toBeCalledWith(
			'No validator found for field type Unknown'
		);
	});
});
