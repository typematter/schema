const VALIDATION_ERROR_NAME = 'ValidationError';

interface ValidationError extends Error {
	readonly name: typeof VALIDATION_ERROR_NAME;
	readonly path: readonly string[];
	readonly __validationError: unique symbol;
}

export { VALIDATION_ERROR_NAME, type ValidationError };
