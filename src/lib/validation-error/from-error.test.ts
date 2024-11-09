import createValidationError from '$helpers/create-validation-error.js';
import { describe, expect, it, vi } from 'vitest';
import create from './create.js';
import fromError from './from-error.js';
import is from './is.js';

vi.mock('./create.js', () => ({
	default: vi.fn()
}));

vi.mock('./is.js', () => ({
	default: vi.fn()
}));

describe('fromError', () => {
	it('should return the error if it is already a ValidationError', () => {
		const error = createValidationError('mock error', ['mock path']);

		vi.mocked(is).mockReturnValue(true);

		const result = fromError(error as Error);

		expect(result).toBe(error);
		expect(is).toBeCalledWith(error);
	});

	it('should convert a non-ValidationError to a ValidationError', () => {
		const error = new Error('mock error');
		const validationError = createValidationError('mock error', ['mock path']);

		vi.mocked(is).mockReturnValue(false);
		vi.mocked(create).mockReturnValue(validationError);

		const result = fromError(error);

		expect(result).toBe(validationError);
		expect(is).toBeCalledWith(error);
		expect(create).toBeCalledWith({
			cause: error,
			message: error.message,
			path: [],
			stack: error.stack
		});
	});

	it('should handle an empty path', () => {
		const error = new Error('Some error');
		const validationError = createValidationError('Some error');
		vi.mocked(is).mockReturnValue(false);
		vi.mocked(create).mockReturnValue(validationError);

		const result = fromError(error);

		expect(result).toBe(validationError);
		expect(is).toBeCalledWith(error);
		expect(create).toBeCalledWith({
			cause: error,
			message: error.message,
			path: [],
			stack: error.stack
		});
	});
});
