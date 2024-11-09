import validationError from '$lib/validation-error/index.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import is from './is.js';
import validate from './validate.js';

vi.mock('./is.js', () => ({ default: vi.fn() }));
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

	it('should validate an object value successfully', () => {
		vi.mocked(is).mockReturnValue(true);

		const errors = validate({ key: 'value' }, { type: 'Object' });

		expect(errors.length).toBe(0);
	});

	it('should return an error for an invalid field type', () => {
		vi.mocked(is).mockReturnValue(false);

		const errors = validate(true, { type: 'Unknown' });

		expect(vi.mocked(validationError.fromString)).toBeCalledWith('Expected object field');

		expect(errors.length).toBe(1);
		expect(errors[0]).toBe('mock error');
	});

	it('should return an error for a non-date value', () => {
		vi.mocked(is).mockReturnValue(true);

		const errors = validate(42, { type: 'Date' });

		expect(vi.mocked(validationError.fromString)).toBeCalledWith(
			'Expected object value, got number'
		);

		expect(errors.length).toBe(1);
		expect(errors[0]).toBe('mock error');
	});
});
