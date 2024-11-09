import { VALIDATION_ERROR_NAME } from '$types/validation-error.js';
import { describe, expect, it } from 'vitest';
import create from './create.js';

describe('create', () => {
	it('should create a ValidationError with the given parameters', () => {
		const params = {
			cause: 'Some cause',
			message: 'Some message',
			path: ['field1', 'field2'],
			stack: 'Some stack trace'
		};

		const error = create(params);

		expect(error).toEqual({
			name: VALIDATION_ERROR_NAME,
			cause: 'Some cause',
			message: 'Some message',
			path: ['field1', 'field2'],
			stack: 'Some stack trace'
		});
	});
});
