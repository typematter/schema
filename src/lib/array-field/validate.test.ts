import schemaField from '$lib/schema-field/index.js';
import validationError from '$lib/validation-error/index.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import is from './is.js';
import validate from './validate.js';

vi.mock('./is.js', () => ({ default: vi.fn() }));

vi.mock('$lib/schema-field/index.js', () => ({
	default: {
		validate: vi.fn()
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

	it('should validate an array value successfully', () => {
		vi.mocked(is).mockReturnValue(true);
		vi.mocked(schemaField.validate).mockReturnValue([]);

		const errors = validate([1, 2, 3], { type: 'Array', items: { type: 'Number' } });

		expect(errors.length).toBe(0);
	});

	it('should return an error for an invalid field type', () => {
		vi.mocked(is).mockReturnValue(false);

		const errors = validate([1, 2, 3], { type: 'Unknown' });

		expect(vi.mocked(validationError.fromString)).toBeCalledWith('Expected array field');

		expect(errors.length).toBe(1);
		expect(errors[0]).toBe('mock error');
	});

	it('should return an error for a non-array value', () => {
		vi.mocked(is).mockReturnValue(true);

		const errors = validate(42, { type: 'Array' });

		expect(vi.mocked(validationError.fromString)).toBeCalledWith(
			'Expected array value, got number'
		);

		expect(errors.length).toBe(1);
		expect(errors[0]).toBe('mock error');
	});
});
