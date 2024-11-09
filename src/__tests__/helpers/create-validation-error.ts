import { VALIDATION_ERROR_NAME, type ValidationError } from '$types/validation-error.js';

const createValidationError: (message: string, path?: readonly string[]) => ValidationError = (
	message,
	path = []
) =>
	// @ts-expect-error The symbol property is only used for typing
	({
		name: VALIDATION_ERROR_NAME,
		message,
		path
	});

export default createValidationError;
