import createValidationError from '$helpers/create-validation-error.js';
import { describe, expect, it } from 'vitest';
import withContext from './with-context.js';

describe('withContext', () => {
	it('should add context to the error message', () => {
		const context = 'Additional context';
		const transformer = withContext(context);
		const error = createValidationError('Original message');
		const result = transformer(error);

		expect(result.message).toBe('Additional context: Original message');
	});

	it('should handle empty context', () => {
		const context = '';
		const transformer = withContext(context);
		const error = createValidationError('Original message');
		const result = transformer(error);

		expect(result.message).toBe(': Original message');
	});

	it('should handle empty error message', () => {
		const context = 'Additional context';
		const transformer = withContext(context);
		const error = createValidationError('');
		const result = transformer(error);

		expect(result.message).toBe('Additional context: ');
	});
});
