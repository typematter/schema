import createValidationError from '$helpers/create-validation-error.js';
import { describe, expect, it } from 'vitest';
import pipe, { type ValidationErrorTransformer } from './pipe.js';

describe('pipe', () => {
	it('should apply a single transformer', () => {
		const transformer: ValidationErrorTransformer = (error) => ({
			...error,
			message: 'Transformed message'
		});
		const error = createValidationError('Original message');
		const result = pipe(transformer)(error);

		expect(result.message).toBe('Transformed message');
	});

	it('should apply multiple transformers in sequence', () => {
		const transformer1: ValidationErrorTransformer = (error) => ({
			...error,
			message: 'First transformation'
		});
		const transformer2: ValidationErrorTransformer = (error) => ({
			...error,
			message: `${error.message} and second transformation`
		});
		const error = createValidationError('Original message');
		const result = pipe(transformer1, transformer2)(error);

		expect(result.message).toBe('First transformation and second transformation');
	});

	it('should return the original error if no transformers are provided', () => {
		const error = createValidationError('Original message');
		const result = pipe()(error);

		expect(result).toEqual(error);
	});
});
