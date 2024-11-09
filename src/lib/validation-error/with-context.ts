import type { ValidationErrorTransformer } from './pipe.js';

/**
 * Adds additional context to a ValidationError's message
 *
 * @param context - Additional context to prepend to the error message
 * @returns A transformer function that adds the context
 */
const withContext: (context: string) => ValidationErrorTransformer = (context) => (error) => ({
	...error,
	message: `${context}: ${error.message}`
});

export default withContext;
