import arrayField from '$lib/array-field/index.js';
import booleanField from '$lib/boolean-field/index.js';
import dateField from '$lib/date-field/index.js';
import numberField from '$lib/number-field/index.js';
import objectField from '$lib/object-field/index.js';
import stringField from '$lib/string-field/index.js';
import validationError from '$lib/validation-error/index.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import validate from './validate.js';

vi.mock('$lib/array-field/index.js', () => ({
	default: {
		is: vi.fn(),
		validate: vi.fn()
	}
}));

vi.mock('$lib/boolean-field/index.js', () => ({
	default: {
		is: vi.fn(),
		validate: vi.fn()
	}
}));

vi.mock('$lib/date-field/index.js', () => ({
	default: {
		is: vi.fn(),
		validate: vi.fn()
	}
}));

vi.mock('$lib/number-field/index.js', () => ({
	default: {
		is: vi.fn(),
		validate: vi.fn()
	}
}));

vi.mock('$lib/object-field/index.js', () => ({
	default: {
		is: vi.fn(),
		validate: vi.fn()
	}
}));

vi.mock('$lib/string-field/index.js', () => ({
	default: {
		is: vi.fn(),
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

	it('should validate an array value', () => {
		vi.mocked(arrayField.is).mockReturnValue(true);
		vi.mocked(arrayField.validate).mockReturnValue([]);

		validate('mock value', 'mock field');

		expect(vi.mocked(arrayField.is)).toBeCalledWith('mock field');
		expect(vi.mocked(arrayField.validate)).toBeCalledWith('mock value', 'mock field', []);
	});

	it('shoud validate a boolean value', () => {
		vi.mocked(booleanField.is).mockReturnValue(true);
		vi.mocked(booleanField.validate).mockReturnValue([]);

		validate('mock value', 'mock field');

		expect(vi.mocked(booleanField.is)).toBeCalledWith('mock field');
		expect(vi.mocked(booleanField.validate)).toBeCalledWith('mock value', 'mock field', []);
	});

	it('should validate a date value', () => {
		vi.mocked(dateField.is).mockReturnValue(true);
		vi.mocked(dateField.validate).mockReturnValue([]);

		validate('mock value', 'mock field');

		expect(vi.mocked(dateField.is)).toBeCalledWith('mock field');
		expect(vi.mocked(dateField.validate)).toBeCalledWith('mock value', 'mock field', []);
	});

	it('should validate a number value', () => {
		vi.mocked(numberField.is).mockReturnValue(true);
		vi.mocked(numberField.validate).mockReturnValue([]);

		validate('mock value', 'mock field');

		expect(vi.mocked(numberField.is)).toBeCalledWith('mock field');
		expect(vi.mocked(numberField.validate)).toBeCalledWith('mock value', 'mock field', []);
	});

	it('should validate an object value', () => {
		vi.mocked(objectField.is).mockReturnValue(true);
		vi.mocked(objectField.validate).mockReturnValue([]);

		validate('mock value', 'mock field');

		expect(vi.mocked(objectField.is)).toBeCalledWith('mock field');
		expect(vi.mocked(objectField.validate)).toBeCalledWith('mock value', 'mock field', []);
	});

	it('should validate a string value', () => {
		vi.mocked(stringField.is).mockReturnValue(true);
		vi.mocked(stringField.validate).mockReturnValue([]);

		validate('mock value', 'mock field');

		expect(vi.mocked(stringField.is)).toBeCalledWith('mock field');
		expect(vi.mocked(stringField.validate)).toBeCalledWith('mock value', 'mock field', []);
	});

	it('should return an error for an invalid field type', () => {
		validate(true, { type: 'Unknown' });

		expect(vi.mocked(validationError.fromString)).toBeCalledWith(
			'No validator found for field: {"type":"Unknown"}'
		);
	});
});
