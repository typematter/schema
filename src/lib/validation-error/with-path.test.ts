import createValidationError from '$helpers/create-validation-error.js';
import { describe, expect, it } from 'vitest';
import withPath from './with-path.js';

describe('withPath', () => {
	it('should prepend a path segment to the error path', () => {
		const error = createValidationError('Error message', ['existing', 'path']);
		const transformer = withPath(['new', 'segment']);
		const result = transformer(error);

		expect(result.path).toEqual(['new', 'segment', 'existing', 'path']);
	});

	it('should handle an empty initial path', () => {
		const error = createValidationError('Error message', []);
		const transformer = withPath(['new', 'segment']);
		const result = transformer(error);

		expect(result.path).toEqual(['new', 'segment']);
	});

	it('should handle an empty path segment to prepend', () => {
		const error = createValidationError('Error message', ['existing', 'path']);
		const transformer = withPath([]);
		const result = transformer(error);

		expect(result.path).toEqual(['existing', 'path']);
	});

	it('should handle both empty initial path and empty path segment to prepend', () => {
		const error = createValidationError('Error message', []);
		const transformer = withPath([]);
		const result = transformer(error);

		expect(result.path).toEqual([]);
	});
});
