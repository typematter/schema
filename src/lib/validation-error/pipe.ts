import { type ValidationError } from '$types/validation-error.js';

type ValidationErrorTransformer = (error: ValidationError) => ValidationError;

/**
 * Composes multiple ValidationError transformers into a single function
 *
 * @param transformers - Array of functions that transform ValidationErrors
 * @returns A single function that applies all transformers in sequence
 */
const pipe: (...transformers: ValidationErrorTransformer[]) => ValidationErrorTransformer =
	(...transformers) =>
	(error) =>
		transformers.reduce((acc, transform) => transform(acc), error);

export type { ValidationErrorTransformer };
export default pipe;
