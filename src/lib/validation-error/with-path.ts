import type { ValidationErrorTransformer } from './pipe.js';

/**
 * Prepends a path segment to the ValidationError's path
 *
 * @param path - Path segment to prepend
 * @returns A transformer function that prepends the path segment
 */
const withPath: (path: readonly string[]) => ValidationErrorTransformer = (path) => (error) => ({
	...error,
	path: [...path, ...error.path]
});

export default withPath;
