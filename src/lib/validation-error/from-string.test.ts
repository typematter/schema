import { describe, expect, it } from 'vitest';
import fromString from './from-string.js';

describe('fromString', () => {
	it('should convert a string error into a ValidationError with the given path', () => {
		const error = 'This is an error';
		const path = ['field1', 'field2'];

		expect(fromString(error, path).message).toEqual(error);
		expect(fromString(error, path).path).toEqual(path);
	});

	it('should convert a string error into a ValidationError with an empty path if no path is provided', () => {
		const error = 'This is an error';

		expect(fromString(error).message).toEqual(error);
		expect(fromString(error).path).toEqual([]);
	});
});
