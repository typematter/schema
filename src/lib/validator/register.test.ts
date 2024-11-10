import type { Validator } from '$types/validator.js';
import { describe, expect, it, vi } from 'vitest';
import register from './register.js';
import registry from './registry.js';

vi.mock('./registry.js', () => ({
	default: {}
}));

describe('register', () => {
	it('should register a validator for a given type', () => {
		const mockValidator = {
			is: () => true,
			validate: () => []
		} as unknown as Validator;

		register('mockType', mockValidator);

		expect(registry['mockType']).toBe(mockValidator);
	});

	it('should overwrite an existing validator for a given type', () => {
		const mockValidator = {
			is: () => true,
			validate: () => []
		} as unknown as Validator;

		const replacementValidator = {
			is: () => false,
			validate: () => ['error']
		} as unknown as Validator;

		register('mockType', mockValidator);
		register('mockType', replacementValidator);

		expect(registry['mockType']).toBe(replacementValidator);
	});
});
